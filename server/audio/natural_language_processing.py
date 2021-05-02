"""
Class containing all logic related to the natural language processing.
"""

import json

from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, SemanticRolesOptions

from server.audio import credentials


def authenticate():
    """
    Uses the key and url from the cloud service to create the IBM authenticator.
    :rtype: SpeechToTextV1
    """
    authenticator = IAMAuthenticator(credentials.API_KEY_NLU)
    service = NaturalLanguageUnderstandingV1(version='2020-08-01', authenticator=authenticator)
    service.set_service_url(credentials.URL_NLU)
    return service


def analyze(text):
    service = authenticate()
    response = service.analyze(
        text=text,
        features=Features(semantic_roles=SemanticRolesOptions())).get_result()
    return json.dumps(response, indent=2)
