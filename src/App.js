import { io } from "socket.io-client";


const connectSocket = () => {
  const socket = io("http://localhost:8000", );
  console.log(123);
}

const  App = () => {
    return (
        <div className="App">
            Hello
            <button onClick={connectSocket}>connect</button>
        </div>
    );
}

export default App;
