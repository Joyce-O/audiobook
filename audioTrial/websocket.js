let wsUri = "ws://localhost:3001";
let websocket = new WebSocket(wsUri);

import { displayTransacript} from './index.js';

function onLoad() {
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
 }
      
 function onOpen(evt) {
    const state = document.getElementById("status");
    state.className = "success";
    state.innerHTML = "Online";
 }
      
 function onClose(evt) {
    const state = document.getElementById("status");
    state.className = "fail";
    state.innerHTML = "Not connected";
    connected.innerHTML = "0";
 }
      
 function onMessage(evt) {
    // There are two types of messages:
    // 1. a chat participant message itself
    // 2. a message with a number of connected chat participants
    var message = evt.data;
          
    if (message.startsWith("log:")) {
       message = message.slice("log:".length);
       log.innerHTML = '<li class = "message">' + 
          message + "</li>" + log.innerHTML;
    }else if (message.startsWith("connected:")) {
       message = message.slice("connected:".length);
       connected.innerHTML = message;
    }else{
      displayTransacript(message);
    }
 }
      
 function onError(evt) {
    const state = document.getElementById("status");
    state.className = "fail";
    state.innerHTML = "Communication error";
 }
      
 export function addMessage(audio) {
    websocket.send(audio);
 }

 window.addEventListener("load", onLoad, false);