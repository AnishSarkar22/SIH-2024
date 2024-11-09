from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId
import os

app = Flask(__name__)

# MongoDB Atlas connection string
app.config["MONGO_URI"] = os.getenv('MONGODB_URI')
# To bypass SSL certificate verification (for testing only)
app.config["MONGO_URI"] += "&tlsAllowInvalidCertificates=true"

mongo = PyMongo(app)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/check_connection")
def check_connection():
    try:
        # Check if mongo object is None
        if mongo.db is None:
            return jsonify({"status": "error", "message": "MongoDB connection not initialized"}), 500
        
        # The ismaster command is cheap and does not require auth.
        mongo.db.command('ismaster')
        return jsonify({"status": "success", "message": "Connected to MongoDB successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e), "type": str(type(e))}), 500

@app.route("/add_user", methods=["POST"])
def add_user():
    try:
        user = request.json
        if not user:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        
        # Extract and validate fields
        user_id = user.get("id")
        name = user.get("name")
        email = user.get("email")
        
        if not user_id or not name or not email:
            return jsonify({"status": "error", "message": "id, name, and email are required"}), 400
        
        # Insert into database
        result = mongo.db.user.insert_one({"id": user_id, "name": name, "email": email})
        
        return jsonify({"id": str(result.inserted_id), "message": "User added successfully"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/get_user", methods=["GET"])
def get_items():
    items = list(mongo.db.items.find())
    return jsonify([{**item, "_id": str(item["_id"])} for item in items])

if __name__ == "__main__":
    app.run(debug=True, port=5002)