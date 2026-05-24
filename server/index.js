const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    console.log("Joined room:", room);
    socket.join(room);
  });

  socket.on("send_message", (data) => {
    console.log("Message:", data);

    socket.to(data.room).emit("receive_message", data);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});