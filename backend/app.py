from flask import Flask, jsonify
from flask_cors import CORS
from mock_data import generate_usage_data

app = Flask(__name__)
CORS(app)

@app.route('/api/usage')
def get_usage():
    data = generate_usage_data()
    return jsonify(data)

import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)