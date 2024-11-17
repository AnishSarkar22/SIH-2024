import pytest
from unittest.mock import Mock, patch
from firebase_admin import firestore
from datetime import datetime, timezone
from db import add_user_to_db, test_connection

@pytest.fixture
def mock_db():
    """Mock Firestore database"""
    with patch('db.db') as mock_db:
        yield mock_db

@pytest.fixture
def mock_doc_ref(mock_db):
    """Mock document reference"""
    doc_ref = Mock()
    mock_db.collection.return_value.document.return_value = doc_ref
    return doc_ref

def test_connection_success(mock_db):
    """Test successful Firestore connection"""
    # Mock successful connection
    test_ref = Mock()
    mock_db.collection.return_value.document.return_value = test_ref
    
    result = test_connection()
    
    assert result["status"] == "success"
    assert result["message"] == "Successfully connected to Firestore"
    test_ref.set.assert_called_once()
    test_ref.delete.assert_called_once()

def test_connection_failure(mock_db):
    """Test failed Firestore connection"""
    mock_db.collection.side_effect = Exception("Connection failed")
    
    result = test_connection()
    
    assert result["status"] == "error"
    assert "Connection failed" in result["message"]

def test_add_user_success(mock_doc_ref):
    """Test adding a user successfully"""
    # Mock document doesn't exist
    mock_doc_ref.get.return_value.exists = False
    
    test_user = {
        "id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
    }
    
    result = add_user_to_db(test_user)
    
    assert result["status"] == "success"
    assert result["id"] == test_user["id"]
    
    # Verify Firestore calls
    mock_doc_ref.set.assert_called_once()
    set_data = mock_doc_ref.set.call_args[0][0]
    assert set_data["name"] == test_user["name"]
    assert set_data["email"] == test_user["email"]
    assert set_data["userType"] == "mentee"
    assert isinstance(set_data["created_at"], datetime)

def test_add_duplicate_user(mock_doc_ref):
    """Test adding a duplicate user"""
    # Mock document already exists
    mock_doc_ref.get.return_value.exists = True
    
    test_user = {
        "id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
    }
    
    result = add_user_to_db(test_user)
    
    assert result["status"] == "error"
    assert result["message"] == "User with this ID already exists"
    mock_doc_ref.set.assert_not_called()

def test_add_user_missing_id():
    """Test adding user without ID"""
    test_user = {
        "name": "John Doe",
        "email": "john@example.com"
    }
    
    result = add_user_to_db(test_user)
    
    assert result["status"] == "error"
    assert result["message"] == "Missing required id field"