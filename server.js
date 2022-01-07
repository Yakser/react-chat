const express = require("express");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rooms = new Map();

app.get("/rooms/:id", (req, res) => {
    const { id: roomId } = req.params;
    const obj = rooms.has(roomId)
        ? {
              users: [...rooms.get(roomId).get("users").values()],
              messages: [...rooms.get(roomId).get("messages").values()],
          }
        : { users: [], messages: [] };
    res.json(obj);
});

app.post("/rooms", (req, res) => {
    const { roomId, username } = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ["users", new Map()],
                ["messages", []],
            ])
        );
    }
    res.json(rooms);
});

io.on("connection", (socket) => {
    socket.on("ROOM:JOIN", ({ roomId, username }) => {
        socket.join(roomId);
        rooms.get(roomId).get("users").set(socket.id, username);
        const users = [...rooms.get(roomId).get("users").values()];
        socket.to(roomId).emit("ROOM:SET_USERS", users);
    });

    socket.on("ROOM:NEW_MESSAGE", ({ roomId, username, text }) => {
        const obj = {
            username,
            text,
        };
        rooms.get(roomId).get("messages").push(obj);
        socket.broadcast.to(roomId).emit("ROOM:NEW_MESSAGE", obj);
    });

    socket.on("disconnect", () => {
        rooms.forEach((value, roomId) => {
            if (value.get("users").delete(socket.id)) {
                const users = [...rooms.get(roomId).get("users").values()];
                socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
            }
        });
    });
    console.log("a user connected", socket.id);
});

server.listen(8000, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log("Server started");
});
