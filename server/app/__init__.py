from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify, abort
from flask_cors import CORS

# local import
from instance.config import app_config

# initialize SQLAlchemy
db = SQLAlchemy()

def send_error_msg(e=None):
    response = jsonify({'error':e})
    response.status_code = 400
    return response

def create_app(config_name):
    from app.models import Todo, TodoList

    app = FlaskAPI(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/api/v1/todo/', methods=['POST', 'GET'])
    def todo():
        if request.method == "POST":
            # POST
            text = str(request.data.get('text', ''))
            if not text:
                return send_error_msg()

            todo = Todo(text=text)
            try:
                todo.save()
                todolist = db.session.query(TodoList).get(1)
                todolist.todos.append(todo)
                db.session.commit()
                response = jsonify({
                    'id': todo.id,
                    'text': todo.text,
                    'position': todo.position,
                    'status': todo.status
                })
                response.status_code = 201
                return response
            except AttributeError:
                return send_error_msg()
        else:
            # GET
            try:
                todos = db.session.query(TodoList).get(1).todos
                results = []
                for todo in todos:
                    obj = {
                        'id': todo.id,
                        'text': todo.text,
                        'position': todo.position,
                        'status': todo.status
                    }
                    results.append(obj)
            except AttributeError:
                return send_error_msg()
            response = jsonify(results)
            response.status_code = 200
            return response

    @app.route('/api/v1/todo/<int:id>', methods=['PUT'])
    def update_todo_status(id):
        todo = db.session.query(Todo).get(id)
        if not todo:
            return send_error_msg()

        try:
            if todo.status == "active":
                todo.status = "completed"
            else:
                todo.status = "active"
            todo.save()
            response = jsonify({})
            response.status_code = 200
            return response
        except:
            return send_error_msg()

    @app.route('/api/v1/todo/complete', methods=['PUT'])
    def update_all_todo_statuses():
        todos = db.session.query(TodoList).get(1).todos
        if not todos:
            return send_error_msg()

        try:
            for todo in todos:
                todo.status = 'completed'
                todo.save()
            response = jsonify({})
            response.status_code = 200
            return response
        except:
            return send_error_msg()

    @app.route('/api/v1/todo/<int:id>/reorder', methods=['PUT'])
    def reorder_todo(id, **kwargs):
        todo = db.session.query(Todo).get(id)
        todolist = db.session.query(TodoList).get(1)

        if not todo:
            return send_error_msg()

        try:
            new_position = int(request.data.get('new_position', None))
            if new_position:
                # pop the element at position, update the new position
                todolist.todos.insert(new_position, todolist.todos.pop(todo.position))
                db.session.commit()

                results = []
                for todo in todolist.todos:
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
        except:
            return send_error_msg()

    return app
