from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

ats_routes = Blueprint('ats_routes', __name__)

@ats_routes.route('/ats/match', methods=['POST'])
@cross_origin()
def match():
    try:
        # Input validation
        if not request.form.get('jdtxt') or not request.form.get('cvtxt'):
            return jsonify({'error': 'Missing required fields'}), 400
            
        textjd = request.form['jdtxt']
        textcv = request.form['cvtxt']
        
        # Ensure inputs are strings
        textjd = str(textjd).lower()
        textcv = str(textcv).lower()
        
        documents = [textjd, textcv]
        count_vectorizer = CountVectorizer(stop_words='english')
        sparse_matrix = count_vectorizer.fit_transform(documents)
        
        # Convert to array instead of using todense()
        doc_term_matrix = sparse_matrix.toarray()
        
        # Calculate similarity
        similarity = cosine_similarity(doc_term_matrix)[1][0]
        match_percentage = min(round(float(similarity) * 100, 2), 100)
        
        return str(match_percentage), 200
   
    except Exception as e:
        print(f"Error in ATS matching: {str(e)}")
        return jsonify({
            'error': 'Processing failed',
            'match_percentage': 0,
            'status': 'error'
        }), 500