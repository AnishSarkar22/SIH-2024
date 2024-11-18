from flask import Flask, send_from_directory, session, jsonify, request, make_response
from flask_cors import CORS
import os
from dotenv import load_dotenv

from firebase_init import initialize_firebase, get_auth
from auth import auth_routes

app = Flask(__name__, static_folder='../dist')
load_dotenv()

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://localhost", "http://127.0.0.1:5000"],}})

# Secure session cookie settings
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

initialize_firebase()
auth = get_auth()

# Register auth routes blueprint
app.register_blueprint(auth_routes, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')



if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=5000) # remove debug=True for production
