"""
Class containing all logic related to the natural language processing.

This service uses the audio transcription to obtain the response, incidents and notes. It assumes that the transcription
has a particular format if the user wishes to create an incident (Action + " y asignar a" + Subject).

Note: in order to get the response, a list of all the possible responses was used.
"""

import re
from unicodedata import normalize

from ibm_cloud_sdk_core import ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, SemanticRolesOptions, EntitiesResult

from audio.resources import credentials
from audio.resources.nlu_exceptions import UserNotFoundException, ActionNotFoundException

"""
Set containing the possible responses.     
"""
possible_responses = [
    "si",
    "no",
    "no aplica",
    "vencido",
    "vigente",
    "vencida",
    "al día",
    "remesa sin habilitación",
    "guardia propia",
    "servicio tercerizado",
    "no tiene",
    "tiene y sin rejas",
    "tiene pero sin rejas",
    "gestor propio",
    "habilitación definitiva",
    "habilitación provisoria",
    "en gestión",
    "sin documentación"
]


def clean_text(text):
    text = re.sub(
        r"([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+", r"\1",
        normalize("NFD", text), 0, re.I
    )
    return text


def split(text):
    """
    Splits the text into response, notes and incident (if there is one) using the possible_responses set.
    Note: This first approach only recognizes one incident.
    :rtype: dictionary with the response and notes
    """
    response_notes_dict = {'response': '', 'note': '', 'incident': {'user': '', 'action': ''}}
    text = clean_text(text)
    try:
        entity = analyze_entities(text)[0]
        response_notes_dict['incident']['user'] = entity
        action = analyze_action(text)
        response_notes_dict['incident']['action'] = action
    except UserNotFoundException or ActionNotFoundException:
        response_notes_dict = {'response': '', 'note': ''}
    text = text.lower()
    text_split = ' '.join(text.split()[:3])
    for resp in possible_responses:
        resp = clean_text(resp)
        if resp in text_split:
            if len(resp) > len(response_notes_dict['response']):
                response_notes_dict['response'] = resp
    response_notes_dict['note'] = text.replace(response_notes_dict['response'], '')
    return response_notes_dict


def authenticate():
    """
    Uses the key and url from the cloud service to create the IBM authenticator.
    :rtype: SpeechToTextV1
    """
    authenticator = IAMAuthenticator(credentials.API_KEY_NLU)
    service = NaturalLanguageUnderstandingV1(version='2020-08-01', authenticator=authenticator)
    service.set_service_url(credentials.URL_NLU)
    return service


def analyze_action(text):
    service = authenticate()
    try:
        response = service.analyze(
            text=text,
            features=Features(semantic_roles=SemanticRolesOptions())).get_result()
        raw_resp = response['semantic_roles'][-1]
        action = raw_resp['action']['text']
        if 'object' in raw_resp:
            action += ' ' + raw_resp['object']['text']
    except ApiException as e:
        raise ActionNotFoundException(e) from e
    return action


def analyze_entities(text):
    entities = []
    service = authenticate()
    response = service.analyze(
        text=text,
        features=Features(entities=EntitiesResult())).get_result()
    for resp in response['entities']:
        if resp['type'] == 'Person':
            entities.append(resp['text'])
    if len(entities) == 0:
        raise UserNotFoundException
    return entities
