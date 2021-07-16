import React from "react";
import "./App.scss";

const handleToggleView = () => {
  // @ts-ignore: Unreachable code error
  window.electron?.toggleView();
};

const handleSendEvent = () => {
  // @ts-ignore: Unreachable code error
  window.electron?.sendEventToApps("Message from Sidecar");
};

export const App = () => {
  return (
    <div className="app-wrapper">
      <h1>SideKick App</h1>
      <button onClick={handleToggleView}>Toggle view</button>
      <button onClick={handleSendEvent}>Send message to Apps</button>
    </div>
  );
};
