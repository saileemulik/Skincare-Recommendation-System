from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/recommend": {"origins": ["http://localhost:8000", "http://127.0.0.1:5500"]}})

# Load the DataFrame once when the application starts
df = pd.read_csv('Skinpro - Skinpro.csv')

@app.route('/recommend', methods=['GET'])
def recommend_product():
    # Retrieve query parameters from the request
    skin_type = request.args.get('skin_type')  # corrected parameter name
    concern = request.args.get('concern')      # corrected parameter name
    
    # Check if both skin_type and concern are provided
    if skin_type is None or concern is None:
        return jsonify({'error': 'Both skin_type and concern parameters are required.'}), 400
    
    # Convert skin_type and concern to strings
    skin_type = str(skin_type)
    concern = str(concern)
    
    # Filter the DataFrame based on the query parameters
    recommended_products = df[(df['Skin type'].str.contains(skin_type, case=False)) &  (df['Concern'].str.contains(concern, case=False))]

    # Prepare the response data
    recommendations = []
    for index, row in recommended_products.iterrows():
        recommendations.append({
            'product_name': row['Product'],
            'product_image_url': row['product_pic']
        })
    
    # Return the recommendations as JSON
    return jsonify(recommendations)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
