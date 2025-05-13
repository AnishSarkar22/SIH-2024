# test_routes.py
from flask import Blueprint, jsonify, make_response, session
from firebase_init import initialize_firebase, get_auth, get_firestore
import logging

test_routes = Blueprint('test_routes', __name__)
logger = logging.getLogger(__name__)

@test_routes.route('/firebase', methods=['GET'])
def test_firebase():
    try:
        # Test initialization
        app = initialize_firebase()
        
        # Test Firestore
        db = get_firestore()
        db.collection('test').document('test').set({'message': 'Test successful'})
        
        return jsonify({
            'status': 'success',
            'message': 'Firebase Firestore connection working',
            'app_name': app.name
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@test_routes.route('/session', methods=['GET'])
def test_session():
    try:
        # Make session permanent
        session.permanent = True
        session['test'] = 'test_value'
        
        response = make_response(jsonify({
            'status': 'success',
            'message': 'Session test complete',
            'session_value': session.get('test')
        }))

        logger.info(f"Session ID: {session.get('test')}")
        
        return response, 200
    except Exception as e:
        logger.error(f"Session error: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500