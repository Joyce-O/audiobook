const WebSocket = require("ws");
const https = require("http");
require("dotenv").config();
const audioContent = require("./googleSpeechApi");

const socket_PORT = process.env.NODE_PORT_WEBSOCKET || 8000;

const webSocketServer = () => {
  let startSocket = true;
  const server = new https.createServer();
  const wss = new WebSocket.Server({ server, rejectUnauthorized: false });

  wss.on("connection", (ws) => {
    console.info("CONNECTED TO WSS : ");
    ws.send("Ready to listen on band 443");

    ws.on("message", async (message) => {
      console.log("message form webclient: ");

      let base64data = Buffer.from(message).toString("base64");
      const transacript = await audioContent(base64data);
      console.log("Received transacript ", transacript);
      ws.send(transacript);
    });
  });
  server.listen(socket_PORT, function listening() {
    console.log("websocket connected on port: ", server.address().port);

    wss.on("open", function open() {
      ws.send("Websocket server is now open!");
    });
  });
  return startSocket;
};

module.exports.webSocketServer;

webSocketServer();
