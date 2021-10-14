import { addMessage } from './websocket.js';

let audioChunks = [];
let rec;
const record = document.getElementById("record");
const stopRecord = document.getElementById("stopRecord");
const saveAudioButton = document.getElementById('saveButton');
let chatbox = document.getElementById('chatbox');

let audioBlob;

const appendEl = (elName, content) => {
 const node = document.createElement("LI");
 node.className = elName;  
 if(elName != "chatbox"){
  const audio = document.createElement('audio')
  audio.src = URL.createObjectURL(content);
  audio.controls = true;
  audio.autoplay = true;
  node.appendChild(audio); 

 }else{ 
  const textnode = document.createTextNode(`Transacript: ${content}`);  // Create a text node
  node.appendChild(textnode); 
 }              
 document.getElementById('chatList').appendChild(node);
}

//check if browser supports getUserMedia
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  alert('Your browser does not support recording!');
}

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    handlerFunction(stream);
  })
  .catch((err) => console.log("The following gUM error occured: " + err));

function handlerFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => {
    audioChunks.push(e.data);
    if (rec.state == "inactive") {
      audioBlob = new Blob(audioChunks, { type: "video/webm;codecs=opus" });
     appendEl('recordedAudio', audioBlob);
    }
  };
}

const getBase64 = () => {
  let base64data;
  const reader = new window.FileReader();
  reader.readAsDataURL(audioBlob);
  reader.onloadend = function () {
   base64data = reader.result;
  }
  console.log('mom ', base64data);
  return base64data; 
}

async function sendData() {
  let base64data;
  const reader = new window.FileReader();
  await reader.readAsDataURL(audioBlob);
  reader.onloadend = await function () {
   base64data = reader.result;
  //  base64data = base64data.split(';base64,')[1];
  console.log('base64data ', base64data)
  console.log(audioBlob instanceof Blob)
   addMessage(audioBlob)

  }
}

record.onclick = (e) => {
  console.log("I was clicked");
  record.disabled = true;
  record.style.backgroundColor = "blue";
  stopRecord.disabled = false;
  rec.start();
};
stopRecord.onclick = (e) => {
  console.log("I was clicked");
  record.disabled = false;
  stop.disabled = true;
  record.style.backgroundColor = "red";
  rec.stop();
};
  //add the event handler to the click event
  saveAudioButton.addEventListener('click', sendData);


function resetRecording () {
  if (recordedAudioContainer.firstElementChild.tagName === 'AUDIO') {
    //remove the audio
    recordedAudioContainer.firstElementChild.remove();
    //hide recordedAudioContainer
    recordedAudioContainer.classList.add('d-none');
    recordedAudioContainer.classList.remove('d-flex');
  }

  audioBlob = null;
}

export function displayTransacript(text) {
  console.log('displayTransacript', text)
  if(text !== "Ready to listen on band 3000"){
    appendEl('chatbox', text);
  }
}