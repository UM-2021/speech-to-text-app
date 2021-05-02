import os
import unittest

from server.audio import speech_to_text

script_dir = os.path.dirname(__file__)


class SpeechToTextTest(unittest.TestCase):

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

    def test_get_transcription(self):
        expected_text = 'sí y por qué la caja fuerte está funcionando bien '
        audio_file = open(os.path.join(script_dir, 'resources/audio2.mp3'), 'rb')
        result = speech_to_text.get_transcription(audio_file)
        self.assertEqual(result, expected_text, f"Should be {expected_text}")


if __name__ == '__main__':
    unittest.main()
