AudioChat
============
[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/Joyce-O/audiobook)

AudioChat is a messaging platform built on websocket and google-speech-to-text API. A sender sends a voice message which is received as a text by the receiver.

## Features
- Group messaging
- upcoming features not yet implemented

---

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

This uses [google-speech-to-text](https://cloud.google.com/speech-to-text/docs/samples) api, check this [resource](https://cloud.google.com/speech-to-text/docs/quickstart-gcloud) for how to create and download a service account credential key

(Make sure you set this GOOGLE_APPLICATION_CREDENTIALS= "PATH-TO-credentialKEY.json" in your environment)

---

## Usage

Once the dependencies are installed, you can run  `npm start` to start the application. This should start socket server

![Imgur](https://imgur.com/5pOChPH)

---

## License
>You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)
This project is licensed under the terms of the **MIT** license.
