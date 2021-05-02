import unittest

from server.audio import natural_language_processing


class SpeechToTextTest(unittest.TestCase):

    def test_interpretation_1(self):
        text = 'Llamar a Juan para que arregle el vidrio '
        result = natural_language_processing.analyze(text)
        print(result)

    def test_interpretation_2(self):
        text = 'Avisarle a Gaston que apruebe la auditoria'
        result = natural_language_processing.analyze(text)
        print(result)


if __name__ == '__main__':
    unittest.main()
