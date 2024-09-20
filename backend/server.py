from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS

import psycopg2
from psycopg2.extras import RealDictCursor
import bcrypt
import os
from datetime import datetime, timedelta


app = Flask(__name__, static_folder='../dist')
CORS(app)


# Configure your PostgreSQL connection
db_config = {
    'host': 'guideme.cdwa88e88mfc.eu-central-2.rds.amazonaws.com',
    'database': 'users',
    'user': 'guideme_master',
    'password': '89*Qi9%Y#5q5oySq&6',
    'port': '5432'
}

def get_db_connection():
    return psycopg2.connect(**db_config)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    # In a real application, you should hash the password before storing it
    try:
        conn = get_db_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "INSERT INTO mentees (name, email, password) VALUES (%s, %s, %s) RETURNING id",
                (name, email, hashed_password.decode('utf-8'))
            )
            user_id = cur.fetchone()['id']
            conn.commit()
        return jsonify({"success": True, "user_id": user_id}), 201
    except psycopg2.Error as e:
        conn.rollback()
        return jsonify({"success": False, "error": str(e)}), 400
    finally:
        conn.close()

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    if not email or not password or not role:
        return jsonify({"error": "Email, password, and role are required"}), 400
    
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        # Determine the table name based on the role
        table_name = 'mentees' if role == 'mentee' else 'mentors'
        
        # Query the appropriate table based on the role
        cur.execute(f"SELECT * FROM {table_name} WHERE email = %s", (email,))
        user = cur.fetchone()
        if user:
            stored_password = user['password']
            if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                return jsonify({
                    "message": "Sign in successful", 
                    "user_id": user['id'], 
                    "role": role
                }), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        print(f"Error during sign in: {e}")
        return jsonify({"error": "An error occurred during sign in"}), 500
    finally:
        try:
            cur.close()
            conn.close()
        except Exception as e:
            print(f"Error closing the database connection: {e}")

if __name__ == '__main__':
    app.run(debug=True)