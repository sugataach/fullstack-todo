import unittest
import os
import json
from app import create_app, db

class TodoTestCase(unittest.TestCase):
    '''This class represents the todo test case'''

    def setUp(self):
        self.app = create_app(config_name='testing')
        self.client = self.app.test_client
        self.todo = {'text': 'Go to Borabora for vacation.'}

        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_todo_creation(self):
        res = self.client().post('/todo/', data=self.todo)
        self.assertEqual(res.status_code, 201)
        self.assertIn('Go to Borabora', str(res.data))

    def test_api_can_get_all_todo(self):
        res = self.client().post('/todo/', data=self.todo)
        self.assertEqual(res.status_code, 201)

        res = self.client().get('/todo/')
        self.assertEqual(res.status_code, 200)
        self.assertIn('Go to Borabora', str(res.data))

    def test_api_can_get_todo_by_id(self):
        rv = self.client().post('/todo/', data=self.todo)
        self.assertEqual(rv.status_code, 201)

        result_in_json = json.loads(rv.data.decode('utf-8').replace("'", "\""))
        result = self.client().get(
            '/todo/{}'.format(result_in_json['id'])
        )
        self.assertEqual(result.status_code, 200)
        self.assertIn('Go to Borabora', str(result.data))

    def test_todo_can_be_edited(self):
        '''Test API can edit an existing todo. (PUT request)'''
        rv = self.client().post(
            '/todo/',
            data={'text': 'Eat, pray and love'}
        )
        self.assertEqual(rv.status_code, 201)
        rv.self.client().put(
            '/todo/1',
            data={'text': 'No more eating'}
        )
        self.assertEqual(rv.status_code, 200)
        results = self.client().get('/todo/1')
        self.assertIn('Not more eating', str(results.data))

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()
