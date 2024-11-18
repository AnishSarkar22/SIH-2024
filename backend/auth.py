# authentication routes for the backend
from flask import Blueprint, request, jsonify, session, make_response
from db import add_user_to_db, get_user_by_id, verify_user_type, test_connection
from datetime import datetime
import logging

import firebase_admin
from firebase_admin import credentials, auth, exceptions
from firebase_admin.exceptions import FirebaseError
from firebase_init import initialize_firebase, get_auth

initialize_firebase()
auth = get_auth()

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/test-connection', methods=['GET'])
def check_connection():
    try:
        result = test_connection()
        if result["status"] == "success":
            return jsonify(result), 200
        else:
            return jsonify(result), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Unexpected error: {str(e)}"
        }), 500    

@auth_routes.route('/check-email', methods=['POST'])
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

@auth_routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    logging.debug("Received signup request with data: %s", data)

    if not name or not email or not password:
        logging.error("Missing required fields: name=%s, email=%s, password=%s", name, email, password)
        return jsonify({"success": False, "error": "Missing required fields"}), 400

    try:
        # Sign up user with Firebase
        user = auth.create_user(
            email=email,
            password=password
        )
        user_id = user.uid
        logging.debug("Firebase signup response: %s", user_id)

        # Store user data in firestore
        user_data = {
            "id": user_id,
            "name": name,
            "email": email
        }

        result = add_user_to_db(user_data)

        if result["status"] == "success":
            logging.debug("User data inserted into firestore with user_id: %s", user_id)
            return jsonify({"success": True, "user_id": user_id}), 201
        else:
            # If insertion fails, we should delete the Firebase user
            auth.delete_user(user_id)
            logging.error("firestore insertion error: %s", result["message"])
            return jsonify({"success": False, "error": result["message"]}), 400
            
    except auth.EmailAlreadyExistsError as e:
        logging.error("Firebase signup error: Email already exists: %s", str(e))
        return jsonify({"success": False, "error": "Email already exists"}), 400
    except FirebaseError as e:
        logging.error("Firebase error: %s", str(e))
        return jsonify({"success": False, "error": "Firebase error occurred"}), 400
    except Exception as e:
        logging.error("Unexpected error: %s", str(e))
        # If we created a Firebase user but encountered another error, clean up
        if 'user_id' in locals():
            try:
                auth.delete_user(user_id)
            except:
                pass
        return jsonify({"success": False, "error": "An unexpected error occurred"}), 500

@auth_routes.route('/login', methods=['POST'])
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
        # First verify Firebase credentials
        user = auth.get_user_by_email(email)
        firebase_user_id = user.uid
        
        # Verify user type in firebase
        verification = verify_user_type(firebase_user_id, role)
        if verification["status"] == "error":
            return jsonify({"error": verification["message"]}), 401
        
        # Get user details from database
        user_data = get_user_by_id(firebase_user_id)
        if user_data["status"] == "error":
            return jsonify({"error": "Failed to fetch user data"}), 500

        
        # Set session after all checks pass
        session['user_id'] = firebase_user_id
        session['role'] = role
        
        return jsonify({
            "message": "Sign in successful", 
            "firebase_user_id": firebase_user_id, 
            "role": role,
            "name": user_data["user"].get("name", ""),  # Include name in response
            "email": email
        }), 200

    except firebase_admin.auth.UserNotFoundError:
        return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        logging.error(f"Error during sign in: {e}")
        return jsonify({"error": "An error occurred during sign in"}), 500

@auth_routes.route('/protected', methods=['GET'])
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
    
@auth_routes.route('/google_signup', methods=['POST'])
def google_signup():
    # Get the Google ID token from the client
    id_token = request.json.get('id_token')
    
    if not id_token or not isinstance(id_token, str):
        return jsonify({'status': 'error', 'message': 'Invalid ID token'}), 400

    try:
        # Verify the ID token and get the user info
        decoded_token = auth.verify_id_token(id_token, check_revoked=True)
        user_info = {
            'id': decoded_token['uid'], # Google's user ID
            'name': decoded_token['name'],
            'email': decoded_token['email'],
            'email_verified': decoded_token['email_verified'],
        }

        # Check if email is verified
        if not user_info['email_verified']:
            return jsonify({'status': 'error', 'message': 'Email not verified'}), 400

        # Add the user to the firestore database
        result = add_user_to_db(user_info)

        if result['status'] == 'success':
            # Store the user ID in the session
            session['user_id'] = user_info['id']
            return jsonify({'status': 'success', 'user_id': user_info['id']})
        else:
            return jsonify({'status': 'error', 'message': result['message']}), 400
    except auth.RevokedIdTokenError:
        return jsonify({'status': 'error', 'message': 'Token has been revoked'}), 401
    except auth.InvalidIdTokenError:
        return jsonify({'status': 'error', 'message': 'Invalid token'}), 401
    except Exception as e:
        return jsonify({'status': 'error', 'message': 'An unexpected error occurred'}), 500

@auth_routes.route('/google_login', methods=['POST'])
def google_login():
    try:
        id_token = request.json.get('id_token')
        if not id_token:
            return jsonify({'status': 'error', 'message': 'No ID token provided'}), 400

        decoded_token = auth.verify_id_token(id_token)
        
        if datetime.fromtimestamp(decoded_token['exp']) < datetime.now():
            return jsonify({'status': 'error', 'message': 'Token expired'}), 401

        user_info = {
            'id': decoded_token['uid'],
            'name': decoded_token.get('name', ''),
            'email': decoded_token.get('email', ''),
            'email_verified': decoded_token.get('email_verified', False)
        }

        result = get_user_by_id(user_info['id'])
        
        if result['status'] == 'success':
            session['user_id'] = user_info['id']
            session['email'] = user_info['email']
            session['authenticated'] = True
            
            return jsonify({
                'status': 'success',
                'user_id': user_info['id'],
                'name': user_info['name'],  # Name is already included
                'email': user_info['email']
            })
        else:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404

    except ValueError as e:
        return jsonify({'status': 'error', 'message': f'Invalid token: {str(e)}'}), 401
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Server error: {str(e)}'}), 500

@auth_routes.route('/facebook_signup', methods=['POST'])
def facebook_signup():
    # Get the Facebook ID token from the client
    id_token = request.json.get('id_token')
    
    if not id_token or not isinstance(id_token, str):
        return jsonify({'status': 'error', 'message': 'Invalid ID token'}), 400

    try:
        # Verify the ID token and get the user info
        decoded_token = auth.verify_id_token(id_token, check_revoked=True)
        
        # Extract Facebook-specific user info
        user_info = {
            'id': decoded_token['uid'],
            'name': decoded_token.get('name', ''),
            'email': decoded_token.get('email', ''),
            'email_verified': decoded_token.get('email_verified', False),
            'facebook_id': decoded_token.get('facebook_id', ''),
            'profile_image': decoded_token.get('picture', '')
        }

        # Add the user to the firestore database
        result = add_user_to_db(user_info)

        if result['status'] == 'success':
            # Store the user ID in the session
            session['user_id'] = user_info['id']
            return jsonify({
                'status': 'success',
                'user_id': user_info['id'],
                'facebook_id': user_info['facebook_id']
            })
        else:
            return jsonify({'status': 'error', 'message': result['message']}), 400
            
    except auth.RevokedIdTokenError:
        return jsonify({'status': 'error', 'message': 'Token has been revoked'}), 401
    except auth.InvalidIdTokenError:
        return jsonify({'status': 'error', 'message': 'Invalid token'}), 401
    except Exception as e:
        return jsonify({'status': 'error', 'message': 'An unexpected error occurred'}), 500

@auth_routes.route('/facebook_login', methods=['POST'])
def facebook_login():
    try:
        # Get the Facebook ID token from client
        id_token = request.json.get('id_token')
        if not id_token:
            return jsonify({'status': 'error', 'message': 'No ID token provided'}), 400

        # Verify the ID token
        decoded_token = auth.verify_id_token(id_token)
        
        # Check if token is expired
        if datetime.fromtimestamp(decoded_token['exp']) < datetime.now():
            return jsonify({'status': 'error', 'message': 'Token expired'}), 401

        user_info = {
            'id': decoded_token['uid'],
            'name': decoded_token.get('name', ''),
            'email': decoded_token.get('email', ''),
            'email_verified': decoded_token.get('email_verified', False),
            'facebook_id': decoded_token.get('facebook_id', ''),
            'profile_image': decoded_token.get('picture', '')
        }

        # Check if user exists in database
        result = get_user_by_id(user_info['id'])
        
        if result['status'] == 'success':
            # Create session with security measures
            session['user_id'] = user_info['id']
            session['email'] = user_info['email']
            session['authenticated'] = True
            
            return jsonify({
                'status': 'success',
                'user_id': user_info['id'],
                'name': user_info['name'],
                'email': user_info['email'],
                'facebook_id': user_info['facebook_id'],
                'profile_image': user_info['profile_image']
            })
        else:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404

    except ValueError as e:
        return jsonify({'status': 'error', 'message': f'Invalid token: {str(e)}'}), 401
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Server error: {str(e)}'}), 500

@auth_routes.route('/logout', methods=['POST'])
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