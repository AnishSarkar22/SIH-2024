import pytest
from flask import Flask
from db import init_db, add_user_to_db

@pytest.fixture
def app():
    """Create and configure a test Flask application"""
    app = Flask(__name__)
    return app

@pytest.fixture
def client(app):
    """Create a test client"""
    return app.test_client()

@pytest.fixture
def init_database(app):
    """Initialize the test database"""
    with app.app_context():
        init_db(app)
        yield
        # Cleanup can be added here if needed

def test_add_user(app, init_database):
    """Test adding a user to the database"""
    test_user = {
        "id": "user900",
        "name": "John Doey",
        "email": "john900@example.com"
    }
    
    with app.app_context():
        result = add_user_to_db(test_user)
        
        assert result["status"] == "success"
        assert "id" in result

# checks the duplicate user prevention functionality
def test_add_duplicate_user(app, init_database):
    """Test adding a duplicate user"""
    test_user = {
        "id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
    }
    
    with app.app_context():
        # Add first user
        add_user_to_db(test_user)
        
        # Try to add same user again
        result = add_user_to_db(test_user)
        
        assert result["status"] == "error"
        assert result["message"] == "User with this ID already exists"
