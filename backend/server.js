const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config()

const app = express();
app.use(cors()); 
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.send("Socket.io Server is Running!");
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("draw", (data) => {
      socket.broadcast.emit("draw", data); 
    });
    socket.on("clear",()=>{
        io.emit("clear");
    })
  
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
  

server.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
  console.log("Server running on ");
});
