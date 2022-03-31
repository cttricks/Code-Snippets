
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const socket = require("socket.io")(http); 
const port = 3000;

http.listen(port);

app.get("/",(req,res)=>{
    res.send("Wohoo.. Our server is live now");
});

socket.on("connect", (io)=>{
    io.on("New_Message",(data)=>{
        socket.emit("New_Message",data);
    });
});
