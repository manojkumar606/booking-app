from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

slots = {}
@app.route('/')
def home():
    return "Flask server is running!"

@app.route('/api/reset-slots', methods=['POST'])
def reset_slots():
    data = request.get_json()
    date = data.get('date')
    if not date:
        return jsonify({'error': 'Date is required'}), 400

    slots[date] = []

    for hour in range(9, 17):
        slots[date].append(f"{hour}:00")
        slots[date].append(f"{hour}:30")

    return jsonify({'message': f'Slots reset for {date}', 'slots': slots[date]}), 200

if __name__ == '__main__':
    app.run(debug=True)
