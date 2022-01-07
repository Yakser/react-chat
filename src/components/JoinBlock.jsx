import React, { useState } from "react";
import socket from "../socket";
import axios from "axios";

import styles from "./JoinBlock.module.scss";

const JoinBlock = ({ onLogin }) => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const onEnter = async () => {
        if (!roomId | !username) {
            return alert("Incorrect data!");
        }
        const data = { roomId, username };
        await axios.post("/rooms", data);
        onLogin(data);
    };

    return (
        <div className={styles.joinBlock}>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(event) => setRoomId(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nickname"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <button onClick={onEnter} className="btn">
                    Join
                </button>
            </form>
        </div>
    );
};

export default JoinBlock;
