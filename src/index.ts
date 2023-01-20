import WebSocket from "ws";
import http from "http";
import app from "./app";
import saveNews from "./handler";

const PORT = process.env.PORT || 5000;

const MINUTE = 60000;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Conectou");
  ws.send("hi there, I am a WebSocket server");

  setInterval(() => {
    ws.send("Teste");
  }, 5000);

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
});

server.listen(PORT, () => {
  console.log("Listening on http://localhost:5000");
  setInterval(() => saveNews(), MINUTE);
});
