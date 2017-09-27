import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import db, create_app, models

app = create_app(config_name=os.getenv('APP_SETTINGS'))
migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

@manager.command
def seed():
    '''Add seed data to the database.'''
    todo_list = models.TodoList()
    db.session.add(todo_list)

    todo_list.todos.append(models.Todo(text="Discuss report with John"))
    todo_list.todos.append(models.Todo(text="Get a haircut", status="completed"))
    todo_list.todos.append(models.Todo(text="Pay electricity bill", status="completed"))
    todo_list.todos.append(models.Todo(text="Check gym hours"))
    db.session.commit()

@manager.command
def downgrade():
    '''Remove seed data from database.'''
    db.drop_all()
    db.create_all()
    db.session.commit()

if __name__ == '__main__':
    manager.run()
