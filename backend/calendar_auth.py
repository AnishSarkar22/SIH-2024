from flask import Blueprint, jsonify, session, redirect, request
from googleapiclient.discovery import build
import os
from google.oauth2 import service_account
import google_auth_oauthlib.flow

calendar_routes = Blueprint('calendar_routes', __name__)

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
CLIENT_SECRETS_FILE = "client_secrets.json"

@calendar_routes.route('/api/calendar/auth')
def auth_calendar():
    try:
        # Initialize OAuth2 flow
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            CLIENT_SECRETS_FILE,
            scopes=SCOPES,
            redirect_uri='http://127.0.0.1:5000/api/calendar/oauth2callback'
        )
        
        # Generate authorization URL
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true'
        )
        
        # Store state in session
        session['state'] = state
        
        return jsonify({
            'status': 'success',
            'authUrl': authorization_url
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@calendar_routes.route('/api/calendar/oauth2callback')
def oauth2callback():
    try:
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            CLIENT_SECRETS_FILE,
            scopes=SCOPES,
            state=session['state'],
            redirect_uri='http://127.0.0.1:5000/api/calendar/oauth2callback'
        )
        
        authorization_response = request.url
        flow.fetch_token(authorization_response=authorization_response)
        credentials = flow.credentials
        
        session['credentials'] = {
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes
        }
        
        return redirect('http://127.0.0.1:5000/dashboard')
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500