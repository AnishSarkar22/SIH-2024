import firebase_admin
from firebase_admin import credentials, auth, firestore
import os
from dotenv import load_dotenv

load_dotenv()

def initialize_firebase():
    """Initialize Firebase Admin SDK if not already initialized"""
    try:
        # Check if Firebase is already initialized
        firebase_admin.get_app()
        return firebase_admin.get_app()
    except ValueError:
        # Initialize Firebase if not already done
        cred = credentials.Certificate('guideme-2c89d-firebase-adminsdk-nk9hq-00add1eee5.json')
        firebase_app = firebase_admin.initialize_app(cred)
        return firebase_app

def get_auth():
    """Get Firebase Auth instance"""
    initialize_firebase()
    return auth

def get_firestore():
    """Get Firestore instance"""
    initialize_firebase()
    return firestore.client()