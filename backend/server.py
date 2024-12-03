from functools import wraps
from flask import Flask, send_from_directory, session, jsonify, request, make_response
from flask_cors import CORS
import logging
# from supabase import create_client, Client
import firebase_admin
from firebase_admin import credentials, auth, exceptions
from firebase_admin.exceptions import FirebaseError
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='../dist')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": "http://localhost"}})  # Assuming frontend is running on localhost

# # Secure session cookie settings
# app.config['SESSION_COOKIE_SECURE'] = True
# app.config['SESSION_COOKIE_HTTPONLY'] = True
# app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# # Use Redis for session storage
# app.config['SESSION_TYPE'] = 'redis'
# app.config['SESSION_REDIS'] = redis.StrictRedis(
#     host=os.getenv('REDIS_HOST', 'localhost'),
#     port=int(os.getenv('REDIS_PORT', 6379)),
#     db=int(os.getenv('REDIS_DB', 0))
# )

# # Initialize the session
# Session(app)  # Added initialization

# Initialize Firebase Admin SDK
cred = credentials.Certificate('guideme-2c89d-firebase-adminsdk-nk9hq-00add1eee5.json')
firebase_admin.initialize_app(cred)

# Configure your PostgreSQL connection
db_config = {
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'port': os.getenv('DB_PORT')
}

def get_db_connection():
    return psycopg2.connect(**db_config)

# example of api database connection
@app.route('/api/test-db-connection')
def test_db_connection():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT 1')
        cur.close()
        conn.close()
        return jsonify({"message": "Successfully connected to the database"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/api/check-email', methods=['POST'])
def check_email():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({"exists": False, "error": "Email is required"}), 400

    try:
        # Check if the email exists in Firebase Authentication
        user = auth.get_user_by_email(email)
        return jsonify({"exists": True}), 200
    except firebase_admin.auth.UserNotFoundError:
        return jsonify({"exists": False}), 200
    except Exception as e:
        return jsonify({"exists": False, "error": str(e)}), 500

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    logging.debug("Received signup request with data: %s", data)

    if not name or not email or not password:
        logging.error("Missing required fields: name=%s, email=%s, password=%s", name, email, password)
        return jsonify({"success": False, "error": "Missing required fields"}), 400

    conn = None
    try:
        # Sign up user with Firebase
        user = auth.create_user(
            email=email,
            password=password
        )
        user_id = user.uid
        logging.debug("Firebase signup response: %s", user_id)

        # Store user data in PostgreSQL
        conn = get_db_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "INSERT INTO mentees (id, name, email) VALUES (%s, %s, %s) RETURNING id",
                (user_id, name, email)
            )
            user_id = cur.fetchone()['id']
            conn.commit()
        logging.debug("User data inserted into PostgreSQL with user_id: %s", user_id)
        return jsonify({"success": True, "user_id": user_id}), 201
    except auth.EmailAlreadyExistsError as e:
        logging.error("Firebase signup error: Email already exists: %s", str(e))
        return jsonify({"success": False, "error": "Email already exists"}), 400
    except FirebaseError as e:
        logging.error("Firebase error: %s", str(e))
        return jsonify({"success": False, "error": "Firebase error occurred"}), 400
    except psycopg2.Error as e:
        if conn:
            conn.rollback()
        logging.error("PostgreSQL error: %s", str(e))
        return jsonify({"success": False, "error": str(e)}), 400
    except Exception as e:
        logging.error("Unexpected error: %s", str(e))
        return jsonify({"success": False, "error": "An unexpected error occurred"}), 500
    finally:
        if conn:
            conn.close()
            logging.debug("Database connection closed")


@app.route('/api/login', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    
    if not email or not password or not role:
        return jsonify({"error": "Email, password, and role are required"}), 400
    
    if role not in ['mentee', 'mentor']:
        return jsonify({"error": "Invalid role"}), 400
    
    try:
        # Verify the user's credentials with Firebase
        user = auth.get_user_by_email(email)
        firebase_user_id = user.uid
        
        # Here we assume the frontend has already verified the password with Firebase
        session['user_id'] = firebase_user_id
        session['role'] = role

        # Here we assume the frontend has already verified the password with Firebase
        return jsonify({
            "message": "Sign in successful", 
            "firebase_user_id": firebase_user_id, 
            "role": role
        }), 200
        

    except firebase_admin.auth.UserNotFoundError:
        return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        logging.error(f"Error during sign in: {e}")
        return jsonify({"error": "An error occurred during sign in"}), 500
    
@app.route('/api/protected', methods=['GET'])
def protected():
    if 'user_id' in session:
        user_id = session['user_id']
        role = session['role']
        return jsonify({
            "message": "Access granted",
            "user_id": user_id,
            "role": role
        }), 200
    else:
        return jsonify({"error": "Unauthorized access"}), 401
    
@app.route('/api/google-signin', methods=['POST'])
def google_signin():
    id_token = request.json.get('id_token')
    if not id_token:
        return jsonify({"error": "ID token is required"}), 400

    try:
        # Verify the ID token with Firebase
        decoded_token = auth.verify_id_token(id_token)
        user_id = decoded_token['uid']
        email = decoded_token['email']
        name = decoded_token.get('name', '')

        # Check if the user exists in PostgreSQL
        conn = get_db_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT id FROM mentees WHERE id = %s", (user_id,))
            user = cur.fetchone()
            if not user:
                # If user does not exist, create a new user
                cur.execute(
                    "INSERT INTO mentees (id, name, email) VALUES (%s, %s, %s) RETURNING id",
                    (user_id, name, email)
                )
                user_id = cur.fetchone()['id']
                conn.commit()

        # Create a session for the user
        session['user_id'] = user_id
        session['email'] = email

        return jsonify({"message": "Google sign-in successful", "user_id": user_id}), 200

    except exceptions.FirebaseError as e:
        logging.error(f"Firebase error during Google sign-in: {e}")
        return jsonify({"error": "Firebase error occurred"}), 500
    except Exception as e:
        logging.error(f"Error during Google sign-in: {e}")
        return jsonify({"error": "An error occurred during Google sign-in"}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/logout', methods=['POST'])
def logout():
    try:
        # Clear the session
        session.clear()
        
        # Create a response
        response = make_response(jsonify({"message": "Logged out successfully"}))
        
        return response, 200
    
    except Exception as e:
        logging.error(f"Error during logout: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=5000)