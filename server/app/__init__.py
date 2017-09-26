from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify, abort

# local import
from instance.config import app_config

# initialize SQLAlchemy
db = SQLAlchemy()

def create_app(config_name):
    from app.models import Todo, TodoList

    app = FlaskAPI(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/todo/', methods=['POST', 'GET'])
    def todo():
        if request.method == "POST":
            # POST
            text = str(request.data.get('text', ''))
            if text:
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
                    pass
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
                results = []
            response = jsonify(results)
            response.status_code = 200
            return response

    @app.route('/todo/<int:id>', methods=['PUT'])
    def reorder_todo(id, **kwargs):
        todo = db.session.query(Todo).get(id)
        todolist = db.session.query(TodoList).get(1)
        new_position = int(request.data.get('new_position', None))

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

    return app
