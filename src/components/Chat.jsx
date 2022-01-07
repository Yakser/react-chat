import React, { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.scss";
import socket from "../socket";
const Chat = ({ users, messages, username, roomId, onAddMessage }) => {
    const [messageValue, setMessageValue] = useState("");
    const messagesRef = useRef(null);

    const onSendMessage = () => {
        socket.emit("ROOM:NEW_MESSAGE", {
            text: messageValue,
            username,
            roomId,
        });
        onAddMessage({ username, text: messageValue });
        setMessageValue("");
    };

    useEffect(() => {
        messagesRef.current.scrollTo(0, 100 * messages.length); // height of message block * messages count
    }, [messages]);

    return (
        <div className={styles.chat}>
            <div className={styles.users}>
                <span className={styles.room}>Room {roomId}</span>
                <span className={styles.usersCount}>
                    Online ({users.length}):
                </span>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.chatMessages}>
                <div ref={messagesRef} className={styles.messages}>
                    {messages.map((message) => (
                        <div className={styles.message}>
                            <p className={styles.text}>{message.text}</p>
                            <div>
                                <span className={styles.username}>
                                    {message.username}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <textarea
                        className={styles.chatInput}
                        rows="3"
                        placeholder="Write a message..."
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                    ></textarea>
                    <button
                        className={styles.sendBtn + " btn"}
                        onClick={onSendMessage}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
