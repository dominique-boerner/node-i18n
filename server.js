const express = require("express");
const i18n = require("./i18n");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

const port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log("Server runs on port %d", port);
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  socket.on("getFiles", () => {
    socket.emit("sendFiles", []);
  });
});
