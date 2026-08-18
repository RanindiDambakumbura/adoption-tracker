from flask import Flask, jsonify
from flask_cors import CORS
from mock_data import generate_usage_data

app = Flask(__name__)
CORS(app)

@app.route('/api/usage')
def get_usage():
    data = generate_usage_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)