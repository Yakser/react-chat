const express = require("express");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms)
});

io.on("connection", socket => {
    console.log("a user connected", socket.id);
});

server.listen(8000, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log("Server started");
});
