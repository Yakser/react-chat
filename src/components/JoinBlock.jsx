import React, { useState } from "react";
import socket from "../socket";
import axios from 'axios';

import styles from "./JoinBlock.module.scss";

const JoinBlock = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const onEnter = () => {
        if (!roomId | !username) {
            return alert('Incorrect data!')
        }
        
        axios.post('/rooms', {roomId, username});
    };

    return (
        <div className={styles.joinBlock}>
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
            <button onClick={onEnter}>Join</button>
        </div>
    );
};

export default JoinBlock;
