import styles from "./App.module.css";
import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";

import React from 'react';
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://127.0.0.1:8000';

function App() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  return (
    <div className={styles.app}> 
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
