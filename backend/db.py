# connection to firebase database and routes for adding and retrieving users
from firebase_init import initialize_firebase, get_firestore
from pathlib import Path
from dotenv import load_dotenv
import os
from datetime import datetime, timezone

# Get the project root directory (parent of current file's directory)
ROOT_DIR = Path(__file__).parent.parent

load_dotenv(ROOT_DIR / '.env')

initialize_firebase()
db = get_firestore()

def test_connection():
    """Test Firestore connection and basic operations"""
    try:
        # Try a basic operation
        test_ref = db.collection('test').document()
        test_ref.set({"test": "connection"})
        test_ref.delete()
        
        return {
            "status": "success",
            "message": "Successfully connected to Firestore"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Connection failed: {str(e)}"
        }

def add_user_to_db(user_data):
    """
    Add a new user to the database
    
    Args:
        user_data (dict): User information including id, name, and email
        
    Returns:
        dict: Status of the operation and document reference
    """
    # Validate required fields
    if 'id' not in user_data:
        return {'status': 'error', 'message': 'Missing required id field'}

    try:
        # Check if user already exists
        user_ref = db.collection('users').document(user_data["id"])
        user_doc = user_ref.get()
        
        if user_doc.exists:
            return {
                "status": "error",
                "message": "User with this ID already exists"
            }
        
        # Add timestamp and userType
        user_data["created_at"] = datetime.now(timezone.utc)
        user_data["userType"] = "mentee"
        
        # Create the user document
        user_ref.set(user_data)
        
        return {
            "status": "success",
            "id": user_data["id"]
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def add_mentor_to_db(user_data):
    """
    Add a new mentor to the database
    
    Args:
        user_data (dict): User information including name, email, and optional id
        
    Returns:
        dict: Status of the operation and document reference
    """
    try:
        # Let Firebase generate a new document ID if not provided
        if 'id' not in user_data:
            user_ref = db.collection('users').document()
            user_data['id'] = user_ref.id
        else:
            user_ref = db.collection('users').document(user_data["id"])
            
        # Check if user already exists
        user_doc = user_ref.get()
        if user_doc.exists:
            return {
                "status": "error",
                "message": "User with this ID already exists"
            }
        
        # Add timestamp and userType
        user_data["created_at"] = datetime.now(timezone.utc)
        user_data["userType"] = "mentor"
        
        # Create the user document
        user_ref.set(user_data)
        
        return {
            "status": "success",
            "id": user_data["id"]
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def update_cal_user_id(user_id, cal_user_id):
    """
    Update user document with Cal.com user ID
    
    Args:
        user_id (str): Firebase user ID
        cal_user_id (str): Cal.com user ID
        
    Returns:
        dict: Status of the operation
    """
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return {
                "status": "error",
                "message": "User not found"
            }
            
        user_ref.update({
            'cal_user_id': cal_user_id
        })
        
        return {
            "status": "success",
            "message": "Cal.com ID updated successfully"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def get_user_by_id(user_id):
    """Retrieve a user by their ID"""
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()
        
        if user_doc.exists:
            user_data = user_doc.to_dict()
            user_data['id'] = user_doc.id  # Add document ID to the data
            return {"status": "success", "user": user_data}
        else:
            return {"status": "error", "message": "User not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def verify_user_type(user_id, role):
    """
    Verify if a user exists and has the correct userType
    
    Args:
        user_id (str): Firebase user ID
        role (str): Expected role ('mentee' or 'mentor')
        
    Returns:
        dict: Status and user data if successful, error message if not
    """
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return {
                "status": "error",
                "message": "User not found in database"
            }
            
        user_data = user_doc.to_dict()
        if user_data.get('userType') != role:
            return {
                "status": "error",
                "message": f"User is not registered as a {role}"
            }
            
        user_data['id'] = user_doc.id  # Add document ID to the data
        return {
            "status": "success",
            "user": user_data
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }