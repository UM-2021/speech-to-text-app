from rest_framework.test import APITestCase


# python manage.py test app_articles.tests.tests_users.ExampleTestCase
class ExampleTestCase(APITestCase):

    def test_example(self):
        """ This test was created just to test the GH Actions "continuous integration.yaml" workflow.
        Once other tests have been developed, it can be removed. """
        a = 4
        b = 5
        c = a + b
        self.assertEqual(c, 9)
