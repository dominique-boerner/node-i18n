const express = require("express");
const i18nServiceInstance = require("./service/i18n.service");
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
    socket.emit("sendFiles", i18nServiceInstance.getFiles());
  });

  socket.on("getFileContent", (args) => {
    const file = args.file;
    console.log(args);
    socket.emit("sendFileContent", i18nServiceInstance.getContentOfFile(file));
  });
});
