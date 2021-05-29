import json
import os
import sys
import time

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

from server.audio.resources import credentials


"""
CUSTOM AUDIO  MODEL FOR RED PAGOS AUDIT SYSTEM

The audio model customization allows the system to recognize specific patterns in the audio itself, it a person
speaks unusually fast or has a different access, this customized model will learn how to recognize it.

In order to improve this model, you can add a new audios_files.zip with recordings from the actual audit team,
this way the model will capture the particularities of the people using this system. After changing the file, just
re-run this script and put the acoustic_customization_id in the speech_to_text.py file.
Example:
{
      "owner": "ab86ed4f-ad53-458e-ab15-27790dc8e26b",
      "base_model_name": "es-AR_BroadbandModel",
      "customization_id": "a5295b2d-fdfb-4124-b34b-e8eef803ddc9", <---- ID
      "versions": ["es-AR_BroadbandModel.v2019-04-10"],
      "created": "2021-05-22T06:32:13.892Z",
      "name": "RedPagos custom audio model",
      "description": "RedPagos' audit system custom audio model",
      "progress": 100,
      "language": "es-AR",
      "updated": "2021-05-22T06:37:42.979Z",
      "status": "available" <----- has to be available
   
"""

"""
Settings
"""
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
headers = {'Content-Type': "application/json"}

"""
Credentials
"""
username = credentials.USERNAME
password = credentials.API_KEY_STT
url = credentials.URL_STT

"""
Create a custom audio model

In order to do this, we use the IBM speech-to-text customizations service and select the Argentinian Spanish 
model as the base.
"""
print("\nCreating custom audio mmodel")

data = {"name": "RedPagos custom audio model",
        "base_model_name": "es-AR_BroadbandModel",
        "description": "RedPagos' audit system custom audio model"}
uri = f'{url}/v1/acoustic_customizations'
json_object = json.dumps(data).encode('utf-8')
resp = requests.post(uri, auth=(username, password), verify=False, headers=headers, data=json_object)

print("Model creation returns: ", resp.status_code)
if resp.status_code != 201:
    print("Failed to create model")
    print(resp.text)
    sys.exit(-1)

respJson = resp.json()
customID = respJson['customization_id']
print("Model customization_id: ", customID)

"""
Add audio resources 

You can add individual audio files or archive files that contain multiple audio files to a custom acoustic model.
The recommended means of adding audio resources is by adding archive files. Creating and adding a single archive file 
is considerably more efficient than adding multiple audio files individually. 

Follow these guidelines when you add audio resources to a custom acoustic model:
- Add at least 10 minutes and no more than 200 hours of audio to a custom acoustic model. 
- The audio must include speech, not silence.
NOTE: The quality of the audio makes a difference when you are determining how much to add. The better the model's audio 
reflects the characteristics of the audio that is to be recognized, the better the quality of the custom model for 
speech recognition. 

After starting this step, need to check its status and wait until the status becomes 'ok'
"""
audio_file = f'{os.path.dirname(__file__)}/resources/audio_files.zip'
audio_name = 'audio_files'

print("\nAdding audio resources")
uri = f'{url}/v1/acoustic_customizations/{customID}/audio/{audio_name}'
header = {'Content-Type': "application/zip"}
with open(audio_file, 'rb') as f:
    r = requests.post(uri, auth=(username, password), verify=False, headers=header, data=f)

print("Adding audio file returns: ", r.status_code)
if r.status_code != 201:
    print("Failed to add audio file")
    print(r.text)
    sys.exit(-1)

"""
Get status of audio uploading loop until done.
"""
uri = f'{url}/v1/acoustic_customizations/{customID}/audio/{audio_name}'
r = requests.get(uri, auth=(username, password), verify=False, headers=headers)
resp_json = r.json()
status = resp_json['container']['status']
time_to_run = 10
while status != 'ok':
    time.sleep(10)
    r = requests.get(uri, auth=(username, password), verify=False, headers=headers)
    resp_json = r.json()
    status = resp_json['container']['status']
    print("status: ", status, "(", time_to_run, ")")
    time_to_run += 10
print("Audio uploading complete")

"""
Start training the model

After starting this step, need to check its status and wait until the status becomes 'available'
"""
print("\nTraining custom model")
uri = f'{url}/v1/acoustic_customizations/{customID}/train?custom_language_model_id=614eac75-9d15-489c-9b48-5da6f6c62a7f'
data = {}
json_object = json.dumps(data).encode('utf-8')
r = requests.post(uri, auth=(username, password), verify=False, data=json_object)

print("Training request returns: ", r.status_code)
if r.status_code != 200:
    print("Training failed to start, exiting")
    print(r.content)
    sys.exit(-1)

"""
Get status of training and loop until done.
"""
uri = f'{url}/v1/acoustic_customizations/{customID}'
r = requests.get(uri, auth=(username, password), verify=False, headers=headers)
resp_json = r.json()
status = resp_json['status']
time_to_run = 10
while status != 'available':
    time.sleep(10)
    r = requests.get(uri, auth=(username, password), verify=False, headers=headers)
    resp_json = r.json()
    status = resp_json['status']
    print("status: ", status, "(", time_to_run, ")")
    time_to_run += 10
print("Training complete")

print("\nGetting custom models")
uri = f'{url}/v1/acoustic_customizations'
r = requests.get(uri, auth=(username, password), verify=False, headers=headers)

print("Get models returns: ", r.status_code)
print(r.text)

sys.exit(0)
