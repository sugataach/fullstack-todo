from app import db
from sqlalchemy.ext.orderinglist import ordering_list

class TodoList(db.Model):
    '''Represents a todolist which has many todos.'''
    __tablename__ = 'todolist'

    id = db.Column(db.Integer, primary_key=True)
    todos = db.relationship(
        'Todo',
        backref='todolist',
        order_by='Todo.position',
        collection_class=ordering_list('position')
    )

    def __repr__(self):
        return '<TodoList: {}>'.format(self.id)

class Todo(db.Model):
    '''Represents a todo which belongs to a todolist.'''

    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    status = db.Column(db.Text, default="active")
    position = db.Column(db.Integer)
    todolist_id = db.Column(
        db.Integer,
        db.ForeignKey('todolist.id'),
        default=1
    )
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp()
    )

    def __init__(self, text, status="active"):
        self.text = text
        self.status = status

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return "<Todo: {}>".format(self.text)
