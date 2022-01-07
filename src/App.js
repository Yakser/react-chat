import axios from "axios";
import "./App.scss";
import JoinBlock from "./components/JoinBlock";
import { useReducer } from "react";
import reducer from "./reducer";
import socket from "./socket";
import { useEffect } from "react";
import Chat from "./components/Chat";
const App = () => {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        username: null,
        users: [],
        messages: [],
    });

    const onLogin = async (obj) => {
        dispatch({
            type: "JOINED",
            payload: obj,
        });
        socket.emit("ROOM:JOIN", obj);
        const { data } = await axios.get(`/rooms/${obj.roomId}`);
        dispatch({
            type: 'SET_DATA',
            payload: data
        });
    };
    const setUsers = (users) => {
        dispatch({
            type: "SET_USERS",
            payload: users,
        });
    };

    const addMessage = (message) => {
        dispatch({ type: "NEW_MESSAGE", payload: message });
    };

    useEffect(() => {
        socket.on("ROOM:SET_USERS", setUsers);
        socket.on("ROOM:NEW_MESSAGE", addMessage);
    }, []);

    return (
        <div className="wrapper">
            {!state.joined ? (
                <JoinBlock onLogin={onLogin} />
            ) : (
                <Chat
                    users={state.users}
                    messages={state.messages}
                    username={state.username}
                    roomId={state.roomId}
                    onAddMessage={addMessage}
                />
            )}
        </div>
    );
};

export default App;
