"""
Class containing all logic related to the speech to text translation.
"""

from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import SpeechToTextV1

from server.audio.resources import credentials


def authenticate():
    """
    Uses the key and url from the cloud service to create the IBM authenticator.
    :rtype: SpeechToTextV1
    """
    authenticator = IAMAuthenticator(credentials.API_KEY_STT)
    service = SpeechToTextV1(authenticator=authenticator)
    service.set_service_url(credentials.URL_STT)
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
    audio.close()
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


def recognizeWithCustomModel(audio, service):
    """
    Uses the IBM Speech to Text service to translate the audio file to text.
    :rtype: dict with the transcript and confidence for the the most likely alternative for the translated text.
    """
    dic = service.recognize(
        audio=audio,
        content_type='audio/mp3',
        model='es-AR_BroadbandModel',
        language_customization_id="614eac75-9d15-489c-9b48-5da6f6c62a7f",
        acoustic_customization_id="a5295b2d-fdfb-4124-b34b-e8eef803ddc9",
        continuous=True).get_result()
    audio.close()
    transcription = dic.get('results')[0].get('alternatives')[0].get('transcript')
    confidence = dic.get('results')[0].get('alternatives')[0].get('confidence')
    return {'transcription': transcription, 'confidence': confidence}
