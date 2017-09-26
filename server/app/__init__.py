from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify, abort

# local import
from instance.config import app_config

# initialize SQLAlchemy
db = SQLAlchemy()

def create_app(config_name):
    from app.models import Todo

    app = FlaskAPI(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/todo/', methods=['POST', 'GET'])
    def todo():
        if request.method == "POST":
            text = str(request.data.get('text', ''))
            if text:
                todo = Todo(text=text)
                todo.save()
                response = jsonify({
                    'id': todo.id,
                    'text': todo.text,
                    'sort_order': todo.sort_order
                })
                response.status_code = 201
                return response
        else:
            todos = Todo.get_all()
            results = []

            for todo in todos:
                obj = {
                    'id': todo.id,
                    'text': todo.text,
                    'position': todo.position,
                    'status': todo.status
                }
                results.append(obj)
            response = jsonify(results)
            response.status_code = 200
            return response

    return app
