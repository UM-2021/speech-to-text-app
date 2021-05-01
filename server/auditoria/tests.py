from rest_framework.test import APITestCase


# python manage.py test app_articles.tests.tests_users.ExampleTestCase
class ExampleTestCase(APITestCase):

    def test_example(self):
        user_data = {
            "username": "Pablo",
            "email": "Pablo@g.com",
            "gender": "M",
            "birth": "2000-12-12T06:55:00Z",
            "level": "SR",
            "password": "Pablo"
        }
        response = self.client.post('/users/', user_data, format='json')

        self.assertEqual(response.status_code, 201)
