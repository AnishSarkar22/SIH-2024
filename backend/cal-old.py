# cal.py
from flask import Flask, request, jsonify
from db import add_mentor_to_db, get_user_by_id, update_cal_user_id
import requests
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

CAL_API_KEY = 'cal_live_055ae20291c2b5b0c5ab8a5e9ccea3d5'
CAL_API_BASE_URL = 'https://api.cal.com/v2'
CAL_CLIENT_ID = 'cm4cybyru004bqg1mov50rnw8'

# New route to create a managed user
@app.route('/api/create-mentor', methods=['POST'])
def create_mentor():
    try:
        # Validate request data
        if not request.is_json:
            return jsonify({'error': 'Request must be JSON'}), 400
            
        data = request.json
        if not data:
            return jsonify({'error': 'Empty request body'}), 400
            
        required_fields = ['email', 'name', 'timezone']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

        # Let Firebase generate the ID if not provided
        mentor_data = {
            "email": data['email'],
            "name": data['name'],
            "timezone": data['timezone']
        }
        
        # If ID is provided, include it
        if 'id' in data:
            mentor_data['id'] = data['id']
        
        mentor_result = add_mentor_to_db(mentor_data)

        if mentor_result['status'] == 'error':
            return jsonify(mentor_result), 400

        # Create Cal.com user
        cal_payload = {
            "email": data['email'],
            "name": data['name'],
            "timeFormat": 12,
            "weekStart": "Monday",
            "timeZone": data['timezone'],
            "locale": "en"
        }

        headers = {
            'Authorization': f'Bearer {CAL_API_KEY}',
            'Content-Type': 'application/json'
        }

        cal_response = requests.post(
            f'{CAL_API_BASE_URL}/oauth-clients/{CAL_CLIENT_ID}/users',
            json=cal_payload,
            headers=headers
        )

        logging.debug(f"Cal.com response: {cal_response.text}")

        if cal_response.status_code != 201:
            return jsonify({
                'error': 'Failed to create Cal.com account',
                'details': cal_response.json()
            }), 400

        # Store Cal.com user ID in Firebase
        cal_user_data = cal_response.json()
        update_result = update_cal_user_id(mentor_result['id'], cal_user_data['id'])

        if update_result['status'] == 'error':
            return jsonify({
                'error': 'Failed to update Cal.com ID',
                'details': update_result['message']
            }), 400
        
        return jsonify({
            'success': True,
            'mentor_id': mentor_result['id'],
            'cal_user_id': cal_user_data['id']
        })

    except Exception as e:
        logging.error(f"Error creating mentor: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/mentor-availability/<mentor_id>', methods=['GET'])
def get_mentor_availability(mentor_id):
    mentor = get_user_by_id(mentor_id)
    if mentor['status'] == 'error':
        return jsonify({'error': 'Mentor not found'}), 404
        
    cal_user_id = mentor['user'].get('cal_user_id')
    if not cal_user_id:
        return jsonify({'error': 'No Cal.com account found'}), 400

    headers = {
        'Authorization': f'Bearer {CAL_API_KEY}'
    }
    
    response = requests.get(
        f'{CAL_API_BASE_URL}/users/{cal_user_id}/availability',
        headers=headers
    )
    
    return jsonify(response.json())

@app.route('/api/verify-cal-account/<email>', methods=['GET'])
def verify_cal_account(email):
    headers = {
        'Authorization': f'Bearer {CAL_API_KEY}'
    }
    
    response = requests.get(
        f'{CAL_API_BASE_URL}/users?email={email}',
        headers=headers
    )
    
    if response.status_code == 200:
        return jsonify({
            'exists': True,
            'user': response.json()
        })
    else:
        return jsonify({
            'exists': False,
            'error': 'User not found'
        })

# New route to fetch managed user details
@app.route('/api/v2/oauth-clients/<client_id>/users/<user_id>', methods=['GET'])
def get_managed_user(client_id, user_id):
    headers = {
        'Authorization': f'Bearer {CAL_API_KEY}',
        'Content-Type': 'application/json'
    }

    response = requests.get(
        f'https://api.cal.com/v2/oauth-clients/{client_id}/users/{user_id}',
        headers=headers
    )

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({
            'error': 'Failed to fetch managed user details',
            'status': response.status_code
        }), response.status_code

# New route to delete managed user details
@app.route('/api/v2/oauth-clients/<client_id>/users/<user_id>', methods=['DELETE'])
def delete_managed_user(client_id, user_id):
    headers = {
        'Authorization': f'Bearer {CAL_API_KEY}',
        'Content-Type': 'application/json'
    }

    response = requests.delete(
        f'https://api.cal.com/v2/oauth-clients/{client_id}/users/{user_id}',
        headers=headers
    )

    if response.status_code == 204:
        return jsonify({'message': 'Managed user deleted successfully'}), 204
    else:
        return jsonify({
            'error': 'Failed to delete managed user',
            'status': response.status_code
        }), response.status_code

# New route to update managed user details
@app.route('/api/v2/oauth-clients/<client_id>/users/<user_id>', methods=['PATCH'])
def update_managed_user(client_id, user_id):
    headers = {
        'Authorization': f'Bearer {CAL_API_KEY}',
        'Content-Type': 'application/json'
    }

    data = request.json

    response = requests.put(
        f'https://api.cal.com/v2/oauth-clients/{client_id}/users/{user_id}',
        headers=headers,
        json=data
    )

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({
            'error': 'Failed to update managed user details',
            'status': response.status_code
        }), response.status_code


if __name__ == '__main__':
    app.run(debug=True)