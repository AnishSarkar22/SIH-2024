# Initialize Firebase Admin SDK and return Firebase Auth and Firestore instances
import firebase_admin
from pathlib import Path
from firebase_admin import credentials, auth, firestore, db
import os
from dotenv import load_dotenv

# Get the project root directory (parent of current file's directory)
ROOT_DIR = Path(__file__).parent.parent

load_dotenv(ROOT_DIR / '.env')

def initialize_firebase():
    """Initialize Firebase Admin SDK if not already initialized"""
    try:
        # Check if Firebase is already initialized
        firebase_admin.get_app()
        return firebase_admin.get_app()
    except ValueError:
        # Initialize Firebase if not already done
        cred = credentials.Certificate('guideme-2c89d-firebase-adminsdk-nk9hq-00add1eee5.json')

        #for using firebase real-time database
        # firebase_app = firebase_admin.initialize_app(cred, {
        #     'databaseURL': os.getenv('VITE_FIREBASE_DATABASE_URL')
        # })
        firebase_app = firebase_admin.initialize_app(cred, {
            'storageBucket': 'guideme-2c89d.appspot.com'
        })
        
        return firebase_app

def get_auth():
    """Get Firebase Auth instance"""
    initialize_firebase()
    return auth

def get_firestore():
    """Get Firestore instance"""
    initialize_firebase()
    return firestore.client()

# def get_realtime_db():
#     """Get Realtime Database instance"""
#     initialize_firebase()
#     return db
