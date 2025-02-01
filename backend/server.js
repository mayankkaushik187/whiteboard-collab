const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const authRouter = require("./routes/auth")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();
app.use(cors()); 
app.use(cookie_parser())
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.json());
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Socket.io Server is Running!");
});
mongoose.connect(process.env.MONGO_DB_CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("MongoDB Connected")})
.catch((e)=>{console.log(e)})

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
