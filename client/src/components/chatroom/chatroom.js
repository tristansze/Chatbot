import React from 'react'
import styles from "./chatroom.module.css";
import { useState, useEffect } from 'react';
//import { Robot } from "../assets/Robot.png";
//import { UserIcon } from "../assets/User.png";

export const Room = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setChatHistory([
      {
        role: 'Bumper',
        message: 'My name\'s Bumper, how can I help you today?',
      }
    ]);
    const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(loadingTimeout); 
    }, []);

    const handleClick = () => {
      setIsClicked(true);

      handleSubmit();
    };


  const handleSubmit = async () => {
    if (userInput.trim() === '') {
      return; // empty input
    }

    try {
      const response = await fetch('http://localhost:3000/chatroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();

      setChatHistory([
        ...chatHistory,
        { role: 'You', message: userInput },
        { role: 'Bumper', message: data.message },
      ]);

      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chatHistory}>
          {chatHistory.map((message, index) => (
          <div key={index} className={`${styles.chat}-${message.role}`}>
          <span className={styles.senderName}>{message.role}: </span>
          {message.message}
        </div>
          ))}
        </div>
        <div className={styles.chatinput}>
          <input
            type={styles.text}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className={styles.inputfield}
          />
          <button 
            onClick={handleClick} 
            className={styles.sendBtn}> 
            Send
          </button>
        </div>
      </div>
    </>
  );
};

