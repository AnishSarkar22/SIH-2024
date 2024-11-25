from flask import Flask, send_from_directory, session, jsonify, request, make_response
from flask_cors import CORS
import os
from pathlib import Path
from dotenv import load_dotenv
from firebase_init import initialize_firebase, get_auth, get_firestore
from auth import auth_routes
from test.test_routes import test_routes
from chat import chat_routes

app = Flask(__name__, static_folder='../dist')

# Get the project root directory (parent of current file's directory)
ROOT_DIR = Path(__file__).parent.parent

load_dotenv(ROOT_DIR / '.env')

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5000", "http://127.0.0.1:5000"],
        "supports_credentials": True
    }
})

# Secure session cookie settings
app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
    PERMANENT_SESSION_LIFETIME=3600  # 60 minutes
)

initialize_firebase()
auth = get_auth()

# Register auth routes blueprint
app.register_blueprint(auth_routes, url_prefix='/api')
# Register test routes blueprint
app.register_blueprint(test_routes, url_prefix='/api/test')
# Register chat routes blueprint
app.register_blueprint(chat_routes, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')





if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=5000) # remove debug=True for production
