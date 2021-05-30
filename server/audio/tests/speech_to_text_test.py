import os
import unittest

from server.audio import speech_to_text

script_dir = os.path.dirname(__file__)


def recognize_custom(audio, service):
    result_custom = speech_to_text.recognizeWithCustomModel(audio, service)
    print(
        f'Custom model recognition 1: Confidence: {result_custom["confidence"]}, Transcription: {result_custom["transcription"]}')


def recognize_normal(audio, service):
    result_normal = speech_to_text.recognize(audio, service)
    print(
        f'Normal model recognition 1: Confidence: {result_normal["confidence"]}, Transcription: {result_normal["transcription"]}\n')


class SpeechToTextTest(unittest.TestCase):
    service = speech_to_text.authenticate()

    def test_transcription_1(self):
        expected_text = 'no porque la seguridad no está funcionando bien aún hay que llamar al director para que lo ' \
                        'ayude '
        audio_binary = open(os.path.join(script_dir, 'resources/audio.mp3'), 'rb')
        service = speech_to_text.authenticate()
        result_dic = speech_to_text.recognize(audio_binary, service)
        self.assertEqual(result_dic['transcription'], expected_text, f"Should be {expected_text}")

    def test_transcription_2(self):
        expected_text = 'sí y por qué la caja fuerte está funcionando bien '
        audio_file = open(os.path.join(script_dir, 'resources/audio2.mp3'), 'rb')
        service = speech_to_text.authenticate()
        result_dic = speech_to_text.recognize(audio_file, service)
        self.assertEqual(result_dic['transcription'], expected_text, f"Should be {expected_text}")

    def test_get_transcription_3(self):
        expected_text = 'sí y por qué la caja fuerte está funcionando bien '
        audio_file = open(os.path.join(script_dir, 'resources/audio2.mp3'), 'rb')
        result = speech_to_text.get_transcription(audio_file)
        self.assertEqual(result, expected_text, f"Should be {expected_text}")

    def test_compare_custom_and_normal_models(self):
        for i in range(3, 8):
            audio = open(os.path.join(script_dir, f'resources/audio{i}.mp3'), 'rb')
            recognize_custom(audio, self.service)
            audio = open(os.path.join(script_dir, f'resources/audio{i}.mp3'), 'rb')
            recognize_normal(audio, self.service)


if __name__ == '__main__':
    unittest.main()
