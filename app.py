from flask import Flask, render_template, jsonify
from simulation.agents import agents
from simulation.roles import roles

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('map.html')

@app.route('/api/agents')
def api_agents():
    return jsonify([a.to_dict() for a in agents])

@app.route('/api/roles')
def api_roles():
    return jsonify([r.to_dict() for r in roles])

if __name__ == '__main__':
    app.run(debug=True)