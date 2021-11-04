
// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

async function convert(audioContent) {
// Creates a client
const client = new speech.SpeechClient();

const config = {
  encoding: 'WEBM_OPUS',
//   sampleRateHertz: sampleRateHertz,
  languageCode: 'en-US',
};
const audio = {
  content: audioContent,
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file
const [response] = await client.recognize(request);
const transcription = response.results
  .map(result => result.alternatives[0].transcript)
  .join('\n');
  console.log(transcription)
return transcription;
}


module.exports = convert;