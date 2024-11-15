from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
from datetime import datetime, timezone

load_dotenv()

MONGO_URI = os.getenv('MONGODB_URI')
# To bypass SSL certificate verification (for testing only)
MONGO_URI += "&tlsAllowInvalidCertificates=true"

mongo = PyMongo()

def init_db(app):
    mongo.init_app(app, uri=MONGO_URI)

def test_connection():
    """Test MongoDB connection and basic operations"""
    try:
        # Verify connection
        mongo.db.command('ping')
        
        # Try a basic operation
        test_result = mongo.db.test.insert_one({"test": "connection"})
        mongo.db.test.delete_one({"_id": test_result.inserted_id})
        
        return {
            "status": "success",
            "message": "Successfully connected to MongoDB"
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
        dict: Status of the operation and inserted document ID
    """
    # Validate required fields
    if 'id' not in user_data:
        return {'status': 'error', 'message': 'Missing required id field'}

    try:
        # Check if user already exists
        existing_user = mongo.db.users.find_one({"id": user_data["id"]})
        if existing_user:
            return {
                "status": "error",
                "message": "User with this ID already exists"
            }
        
        user_data["created_at"] = datetime.now(timezone.utc) # Add timestamp
        user_data["userType"] = "mentee" # Add userType field
        
        # Insert the user
        result = mongo.db.users.insert_one(user_data)
        
        return {
            "status": "success",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def get_user_by_id(user_id):
    """Retrieve a user by their ID"""
    try:
        user = mongo.db.users.find_one({"id": user_id})
        if user:
            user['_id'] = str(user['_id'])
            return {"status": "success", "user": user}
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
        user = mongo.db.users.find_one({"id": user_id})
        if not user:
            return {
                "status": "error",
                "message": "User not found in database"
            }
            
        if user.get('userType') != role:
            return {
                "status": "error",
                "message": f"User is not registered as a {role}"
            }
            
        return {
            "status": "success",
            "user": user
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
