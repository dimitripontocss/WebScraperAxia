import WebSocket from "ws";
import http from "http";
import app from "./app";
import saveNews from "./scraper&DbLogic/handler";
import getLatestNews from "./scraper&DbLogic/getNews";

const PORT = process.env.PORT || 5000;

const TIME = 45000;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Connected to WebSocket");

  setInterval(async () => {
    const latestNews = await getLatestNews();
    ws.send(JSON.stringify(latestNews));
  }, 5000);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  setInterval(() => saveNews(), TIME);
});
