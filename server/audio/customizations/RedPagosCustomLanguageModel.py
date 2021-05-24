import codecs
import json
import os
import sys
import time

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

from server.audio.resources import credentials

"""
CUSTOM AUDIO LANGUAGE MODEL FOR RED PAGOS AUDIT SYSTEM

The language model customization interface can improve the accuracy of speech recognition for specific domains. 
By using this language model customization, you can expand and tailor the vocabulary of a base model to include 
domain-specific terminology. You create a custom language model and add corpora and words specific to your domain. 
Once you train the custom language model on your enhanced vocabulary, you can use it for customized speech recognition.

In order to improve this model, you can always add new phrases, names and words to the corpus.txt file and re-run this 
script. From the corpus file, the model will learn new words and infer their pronunciation, along with context
phrases where it can be used.

NOTE: If you re-run this script, the 'language_customization_id' in the speech_to_text.py file needs to be updated to 
the new id found in the last json from the logs where the model status is available.
Example:
{
      "owner": "ab86ed4f-ad53-458e-ab15-27790dc8e26b",
      "base_model_name": "es-AR_BroadbandModel",
      "customization_id": "aeacb49f-b8e7-437c-8506-f1b3224b2bc3", <----- ID
      "dialect": "es-AR",
      "versions": ["es-AR_BroadbandModel.v2019-04-10"],
      "created": "2021-05-22T04:36:57.852Z",
      "name": "RedPagos custom model",
      "description": "RedPagos' audit system custom audio model",
      "progress": 100,
      "language": "es-AR",
      "updated": "2021-05-22T04:37:28.593Z",
      "status": "available"
   }
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
Create a custom language model

In order to do this, we use the IBM speech-to-text customizations service and select the Argentinian Spanish 
model as the base.
"""
print("\nCreating custom mmodel")
data = {"name": "RedPagos custom model",
        "base_model_name": "es-AR_BroadbandModel",
        "description": "RedPagos' audit system custom audio model"}
uri = f'{url}/v1/customizations'
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
Add a corpus file

This file is a plain text file used to enrich the vocabulary of the model, and tailor it to the business.
As many corpus as we want might be added, the more the better, and ideally there is one sentence pero line.
"""
corpus_file = f'{os.path.dirname(__file__)}/resources/corpus.txt'
corpus_name = 'corpus1'

print("\nAdding corpus file")

uri = f'{url}/v1/customizations/{customID}/corpora/{corpus_name}'
with open(corpus_file, 'rb') as f:
    r = requests.post(uri, auth=(username, password), verify=False, headers=headers, data=f)

print("Adding corpus file returns: ", r.status_code)
if r.status_code != 201:
    print("Failed to add corpus file")
    print(r.text)
    sys.exit(-1)

"""
Get status of corpus file added

After a corpus is uploaded, there is some analysis done to extract out-of-vocabulary words and we can't upload
a new corpus while this is being done, so we loop until it's analyzed.
"""
print("Checking status of corpus analysis")
uri = f'{url}/v1/customizations/{customID}/corpora/{corpus_name}'
r = requests.get(uri, auth=(username, password), verify=False, headers=headers)
resp_json = r.json()
status = resp_json['status']
time_to_run = 10
while status != 'analyzed':
    time.sleep(10)
    r = requests.get(uri, auth=(username, password), verify=False, headers=headers)
    resp_json = r.json()
    status = resp_json['status']
    time_to_run += 10
    print(f'Status: {status}')
print("Corpus analysis done")

"""
Show all OOVs found

This step is to look at the OOVs and validate the auto-added sounds-like field
"""
print("\nListing words")
uri = f'{url}/v1/customizations/{customID}/words?sort=count'
r = requests.get(uri, auth=(username, password), verify=False, headers=headers)
print("Listing words returns: ", r.status_code)
file = codecs.open(f'{os.path.dirname(__file__)}/{customID}.OOVs.corpus', 'wb', 'utf-8')
file.write(r.text)
print(f"Words list from added corpus saved in file: {customID} OOVs.corpus")

"""
Start training the model

After starting this step, need to check its status and wait until the status becomes 'available'
"""
print("\nTraining custom model")
uri = f'{url}/v1/customizations/{customID}/train'
data = {}
json_object = json.dumps(data).encode('utf-8')
r = requests.post(uri, auth=(username, password), verify=False, data=json_object)

print("Training request returns: ", r.status_code)
if r.status_code != 200:
    print("Training failed to start, exiting")
    sys.exit(-1)

"""
Get status of training and loop until done.
"""
uri = f'{url}/v1/customizations/{customID}'
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
uri = f'{url}/v1/customizations'
r = requests.get(uri, auth=(username, password), verify=False, headers=headers)

print("Get models returns: ", r.status_code)
print(r.text)

sys.exit(0)
