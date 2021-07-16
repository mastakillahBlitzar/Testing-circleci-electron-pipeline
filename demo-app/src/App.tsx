import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

declare global {
  interface Window {
    electron:any;
  }
}

const appName = "Demo App";

function App() {
  const [messagesList, setMessagesList] = useState<Array<string>>([]);
  useEffect(() => {
    window.electron?.recieveMessage("main-event", (...args: Array<string>) => {
      console.log("Event from Main: ", args);
      setMessagesList([...messagesList.slice(-2), args[0]]);
    });
  });

  const sendMessage = (message: string) => {
    window.electron?.pingMain(appName, message);
  };

  const showNotification = (message: string) => { 
    window.electron?.showNotification(appName, message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Last 3 messages from main:</p>
        <ul>
          {messagesList.length > 0 ? (
            messagesList.map(message => (
              <li>
                <code>{message}</code>
              </li>
            ))
          ) : (
            <code>No messages yet</code>
          )}
        </ul>
        <button onClick={() => sendMessage("Hello its me")}>
          {window.electron ? "Ping Main!" : "Electron Not Available"}
        </button>
        <button onClick={() => showNotification("Hello its me")}>
          {window.electron ? "Show Notification!" : "Electron Not Available"}
        </button>
      </header>
    </div>
  );
}

export default App;
