# app.py
from flask import Flask, request, jsonify, Response, Blueprint, Response
from firebase_init import initialize_firebase, get_firestore
from flask_cors import CORS
import openai
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import os
from dotenv import load_dotenv
import time
from typing import Optional, Iterator
from pathlib import Path
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

ROOT_DIR = Path(__file__).parent.parent

load_dotenv(ROOT_DIR / '.env')
db = get_firestore()
ai_routes = Blueprint('ai_routes', __name__)

# Initialize OpenAI
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def get_gpt4o(messages, max_tokens=1000):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=max_tokens,
            n=1,
            temperature=0.7,
            stream=True,
        )
        return response
    except openai.RateLimitError:
        time.sleep(60)
        return get_gpt4o(messages, max_tokens)
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def classify_query(user_input):
    messages = [
        {"role": "system", "content": "You are a helpful career and education advisor."},
        {"role": "user", "content": f"""Classify the following query as either 'career', 'education', or 'other'. 
        If the query is about job changes, career paths, professional development, or specific industries (including gaming), classify it as 'career'.
        If the query is about learning, courses, or academic pursuits, classify it as 'education'.
        Only use 'other' if the query is completely unrelated to career or education.
        Respond with just the classification word.
        Query: {user_input}
        Classification:"""}
    ]
    response = get_gpt4o(messages, max_tokens=10)
    classification = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            classification += chunk.choices[0].delta.content
    return classification.lower().strip()

@ai_routes.route('/classify', methods=['POST'])
def classify_message():
    data = request.json
    user_message = data.get('message')
    query_type = classify_query(user_message)
    return jsonify({'classification': query_type})

@ai_routes.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    conversation_id = data.get('conversationId')
    
    # First classify the query
    query_type = classify_query(user_message)
    
    if query_type not in ['career', 'education']:
        return jsonify({
            'success': False,
            'error': 'Please ask a question related to career or education.'
        })

    def generate():
        messages = [
            {"role": "system", "content": "You are a helpful career and education advisor. Provide detailed guidance and ask follow-up questions to ensure all aspects of the user's query are addressed."},
            {"role": "user", "content": user_message}
        ]

        # Store user message in Firebase
        messages_ref = db.collection('conversations').document(conversation_id).collection('messages')
        messages_ref.add({
            'content': user_message,
            'sender': 'user',
            'timestamp': datetime.now(),
            'type': query_type,
            'initials': 'Y'
        })

        try:
            response = get_gpt4o(messages, max_tokens=2000)
            full_response = ""
            
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield f"data: {json.dumps({'content': content})}\n\n"
            
            # Store AI response in Firebase
            messages_ref.add({
                'content': full_response,
                'sender': 'ai',
                'timestamp': datetime.now(),
                'type': query_type,
                'initials': 'AI'
            })

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return Response(generate(), mimetype='text/event-stream')

@ai_routes.route('/messages/<conversation_id>', methods=['GET'])
def get_messages(conversation_id):
    messages_ref = db.collection('conversations').document(conversation_id).collection('messages')
    messages = messages_ref.order_by('timestamp').stream()
    
    message_list = []
    for msg in messages:
        msg_data = msg.to_dict()
        message_list.append({
            'id': msg.id,
            'content': msg_data['content'],
            'sender': msg_data['sender'],
            'timestamp': msg_data['timestamp'].isoformat(),
            'type': msg_data.get('type', ''),
            'initials': msg_data['initials']
        })
    
    return jsonify(message_list)
