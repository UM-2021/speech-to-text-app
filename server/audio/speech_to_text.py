"""
Class containing all logic related to the speech to text translation.
"""
import json

from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import SpeechToTextV1

from . import credentials as credentials


def authenticate():
    """
    Uses the key and url from the cloud service to create the IBM authenticator.
    :rtype: SpeechToTextV1
    """
    authenticator = IAMAuthenticator(credentials.API_KEY)
    service = SpeechToTextV1(authenticator=authenticator)
    service.set_service_url(credentials.URL)
    return service


def recognize(audio, service):
    """
    Uses the IBM Speech to Text service to translate the audio file to text.
    :rtype: dict with the transcript and confidence for the the most likely alternative for the translated text.
    """
    dic = service.recognize(
            audio=audio,
            content_type='audio/mp3',
            model='es-AR_BroadbandModel',
            continuous=True).get_result()
    transcription = dic.get('results')[0].get('alternatives')[0].get('transcript')
    confidence = dic.get('results')[0].get('alternatives')[0].get('confidence')
    return {'transcription': transcription, 'confidence': confidence}


def get_transcription(audio):
    """
    Uses the IBM Speech to Text service to return the audio's transcription.
    :rtype: string containing the transcription
    """
    service = authenticate()
    return recognize(audio, service)['transcription']
