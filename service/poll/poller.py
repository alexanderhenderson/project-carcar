import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something

# the below import works once the program is running
from .models import AutomobilesVO

def get_automobiles():

    print("We are in the polling function")
    # response = requests.get("http://wardrobe-api:8000/api/locations/")

    # content = json.loads(response.content)
    # print("Polled and received content: ", content)

    #for automobile in response["automobiles"]


def poll():
    while True:
        print('Service poller polling for data - is this thing on?')
        try:
            # Write your polling logic, here
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(1)


if __name__ == "__main__":
    poll()
