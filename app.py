from flask import Flask, render_template, request, redirect, url_for, flash, session
import psycopg2
import psycopg2.extras
import bcrypt
from functools import wraps
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, HiddenField
from wtforms.validators import DataRequired, Email, Length

app = Flask(__name__)

app.secret_key = "9382yrugefhdvjkfdv"  # Consider moving this to an environment variable

DB_HOST = "guideme.cdwa88e88mfc.eu-central-2.rds.amazonaws.com"
DB_NAME = "users"
DB_USER = "guideme_master"
DB_PASS = "89*Qi9%Y#5q5oySq&6"

def get_db_connection():
    return psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash("Please log in to access this page.", "error")
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        role = 'mentee'  # Default role

        if not all([email, password, confirm_password]):
            flash("Please fill in all fields.", "error")
            return redirect(url_for('signup'))

        if len(password) < 8:
            flash("Password must be at least 8 characters long.", "error")
            return redirect(url_for('signup'))

        if password != confirm_password:
            flash("Passwords do not match.", "error")
            return redirect(url_for('signup'))

        try:
            with get_db_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
                    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
                    if cur.fetchone():
                        flash("Email already exists. Please log in instead.", "error")
                        return redirect(url_for('signup'))

                    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                    cur.execute("INSERT INTO users (email, password, role) VALUES (%s, %s, %s)", 
                                (email, hashed_password.decode('utf-8'), role))
                    conn.commit()

            flash("Account created successfully. Please log in.", "success")
            return redirect(url_for('login'))
        except Exception as e:
            app.logger.error(f"Database error: {str(e)}")
            flash("An error occurred. Please try again later.", "error")
            return redirect(url_for('signup'))

    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')
        print("Email:", email)  # Debugging line
        print("Password:", password)  # Debugging line

        # if not email or not password:
        #     flash("Please enter both email and password.", "error")
        #     return redirect(url_for('login'))

        # if not role:
        #     flash("Please select a role (Mentor or Mentee).", "error")
        #     return redirect(url_for('login'))

        try:
            with get_db_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
                    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
                    user = cur.fetchone()

            if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                if user['role'] != role:
                    flash(f"You don't have access as a {role}. Please choose the correct role.", "error")
                    return redirect(url_for('login'))

                session['user_id'] = user['id']
                session['role'] = user['role']
                if role == 'mentee':
                    return redirect(url_for('firstpage_mentee'))
                elif role == 'mentor':
                    return redirect(url_for('mentor_dashboard'))
            else:
                flash("Invalid email or password. Please try again.", "error")
        except Exception as e:
            flash("An error occurred. Please try again later.", "error")

        return redirect(url_for('login'))

    return render_template("signup.html")  


@app.route('/logout')
@login_required
def logout():
    session.clear()
    flash("You have been logged out successfully.", "success")
    return redirect(url_for('login'))

@app.route("/mentor/apply")
@login_required
def apply_mentor():
    return render_template("apply_mentor.html")

@app.route("/welcome")
@login_required
def firstpage_mentee():
    return render_template("mentee_firstpage.html")

@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html")

@app.route("/mdashboard")
@login_required
def mentor_dashboard():
    return render_template("mentor_dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)