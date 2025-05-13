# chat using HTTP polling
from flask import Blueprint, request, jsonify, send_file, session
from firebase_admin import storage, firestore
from datetime import datetime, timezone
from firebase_init import get_firestore, get_auth
from db import get_user_by_id
import logging
import uuid
from werkzeug.utils import secure_filename
import os
from functools import wraps

chat_routes = Blueprint('chat_routes', __name__)
logger = logging.getLogger(__name__)

# Initialize Firestore
db = get_firestore()
auth = get_auth() 
bucket = storage.bucket()  # Uses default bucket from firebase_init.py

def validate_user_session(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Not authenticated'}), 401
            
        # For routes that use user_id parameter
        user_id = kwargs.get('user_id') or request.json.get('mentee_id')
        if user_id and user_id != session['user_id']:
            return jsonify({'error': 'Unauthorized access'}), 403
            
        return f(*args, **kwargs)
    return decorated_function

# books a session between a mentor and a mentee
@chat_routes.route('/book-session', methods=['POST'])
# @validate_user_session
def book_mentor_session():
    try:
        data = request.json
        mentee_id = data.get('mentee_id')
        mentor_id = data.get('mentor_id')

        if not mentee_id or not mentor_id:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Initialize session if not exists
        if 'user_id' not in session:
            session['user_id'] = mentee_id  # Or get from auth token/login
        
        # Verify mentee_id matches session user
        if mentee_id != session['user_id']:
            return jsonify({'error': 'Unauthorized'}), 403

        # Create unique session ID
        session_id = str(uuid.uuid4())
        
        # Create unique chat ID using sorted user IDs to ensure consistency
        chat_id = f"{min(mentee_id, mentor_id)}_{max(mentee_id, mentor_id)}"

        # Add session to sessions collection
        session_ref = db.collection('sessions').document(session_id)
        session_ref.set({
            'mentee_id': mentee_id,
            'mentor_id': mentor_id,
            'status': 'booked',
            'chat_id': chat_id,
            'created_at': datetime.now(timezone.utc).isoformat()
        })

        # Initialize chat document in chats collection
        chat_ref = db.collection('chats').document(chat_id)
        chat_ref.set({
            'mentee_id': mentee_id,
            'mentor_id': mentor_id,
            'session_id': session_id,
            'created_at': datetime.now(timezone.utc).isoformat(),
            'last_message': None,
            'active': True
        })

        return jsonify({
            'success': True,
            'session_id': session_id,
            'chat_id': chat_id
        }), 200

    except Exception as e:
        logger.error(f"Error booking session: {str(e)}")
        return jsonify({'error': str(e)}), 500

# initializes a new chat conversation between a mentor and mentee
@chat_routes.route('/start-chat', methods=['POST'])
def start_mentor_chat():
    try:
        data = request.json
        mentee_id = data['mentee_id']
        mentor_id = data['mentor_id'] # change this to get mentor id from "mentor individual" page

        mentee = db.collection('users').document(mentee_id).get()
        mentor = db.collection('users').document(mentor_id).get()

        if not mentee.exists:
            return jsonify({'error': 'Mentee not found'}), 404
        if not mentor.exists:
            return jsonify({'error': 'Mentor not found'}), 404

        mentee_data = mentee.to_dict()
        mentor_data = mentor.to_dict()

        if mentee_data['userType'] != 'mentee':
            return jsonify({'error': 'Invalid mentee user type'}), 400
        if mentor_data['userType'] != 'mentor':
            return jsonify({'error': 'Invalid mentor user type'}), 400

        chat_id = f"{min(mentee_id, mentor_id)}_{max(mentee_id, mentor_id)}"

        db.collection('chats').document(chat_id).set({
            'mentee_id': mentee_id,
            'mentor_id': mentor_id,
            'created_at': datetime.now(timezone.utc).isoformat(),
            'active': True
        })

        return jsonify({
            'success': True,
            'chat_id': chat_id,
            'mentor': {
                'id': mentor_id,
                'name': mentor_data['name']
            },
            'mentee': {
                'id': mentee_id,
                'name': mentee_data['name']
            }
        }), 200

    except Exception as e:
        logger.error(f"Error starting mentor chat: {str(e)}")
        return jsonify({'error': str(e)}), 500

# handles user online/offline status tracking
# Uses: Tracks last seen timestamp, used for showing online/offline indicators in chat
@chat_routes.route('/presence/<user_id>', methods=['POST'])
def update_presence(user_id):
    try:
        db.collection('presence').document(user_id).set({
            'online': True,
            'last_seen': datetime.now(timezone.utc).isoformat()
        })
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# handles marking messages as read in a chat conversation
# Uses: Updates unread messages to read status, Used when user opens/views messages
@chat_routes.route('/chat/<chat_id>/read', methods=['POST'])
def mark_messages_read(chat_id):
    try:
        data = request.json
        user_id = data['user_id']
        
        # Mark all messages as read for this user
        messages_ref = db.collection('chats').document(chat_id)\
            .collection('messages')\
            .where('receiver_id', '==', user_id)\
            .where('read', '==', False)
            
        for doc in messages_ref.stream():
            doc.reference.update({'read': True})
            
        return jsonify({'success': True}), 200
        
    except Exception as e:
        logger.error(f"Error marking messages read: {str(e)}")
        return jsonify({'error': str(e)}), 500

@chat_routes.route('/create_session', methods=['POST'])
def create_session():
    try:
        # Get data from request
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Extract and validate required fields
        mentor_id = data.get('mentor_id')
        mentee_id = data.get('mentee_id')
        
        if not all([mentor_id, mentee_id]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Generate unique chat_id using sorted IDs to ensure consistency
        chat_id = f"{min(mentor_id, mentee_id)}_{max(mentor_id, mentee_id)}"
        
        # Store in Firestore sessions collection
        session_ref = db.collection('sessions').add({
            'chat_id': chat_id,
            'mentor_id': mentor_id,
            'mentee_id': mentee_id,
            'status': 'booked',
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP
        })

        return jsonify({
            'success': True,
            'session_id': session_ref.id,
            'chat_id': chat_id
        }), 201

    except Exception as e:
        return jsonify({
            'error': 'Failed to create session',
            'message': str(e)
        }), 500