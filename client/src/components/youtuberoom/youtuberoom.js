
/*
import React, { useState, useEffect, useRef } from 'react';
import styles from './youtuberoom.module.css';

export const YoutubeRoom = () => {
  const [ws, setWs] = useState(null);
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setWs(socket);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received:', message);
      switch (message.type) {
        case 'videoState':
          setUrl(message.data.url);
          setPlaying(message.data.playing);
          setCurrentTime(message.data.currentTime);
          break;
        case 'playPause':
          setPlaying(message.data.playing);
          break;
        case 'changeVideo':
          setUrl(message.data.url);
          setCurrentTime(0);
          break;
        case 'timeSync':
          setCurrentTime(message.data.currentTime);
          break;
        case 'chatMessage':
          setMessages((prevMessages) => [...prevMessages, message.data]);
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup function
    return () => {
      console.log('Cleaning up WebSocket...');
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handlePlayPause = () => {
    const newPlayingState = !playing;
    setPlaying(newPlayingState);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'playPause', data: { playing: newPlayingState } }));
    }
  };

  const handleChangeVideo = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'changeVideo', data: { url: newUrl } }));
    }
  };

  const handleSeek = (e) => {
    const newCurrentTime = e.target.currentTime;
    setCurrentTime(newCurrentTime);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'timeSync', data: { currentTime: newCurrentTime } }));
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'chatMessage', data: message }));
      }
      setMessage('');
    }
  };

  return (
    <div className={styles.youtuberoom}>
      <div className={styles.videocontainer}>
        <video
          src={url}
          controls
          autoPlay
          onTimeUpdate={handleSeek}
        />
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Video URL"
            value={url}
            onChange={handleChangeVideo}
          />
          <button className={styles.button1} onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        </div>
      </div>
      <div className={styles.chatcontainer}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.bottombar}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button className={styles.button2} onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

*/

import React, { useState, useEffect, useRef } from 'react';
import styles from './youtuberoom.module.css'; // Adjust path as needed

export const YoutubeRoom = () => {
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const videoRef = useRef(null);
  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');
  
    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };
  
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
  
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'sync') {
        setUrl(data.data.videoUrl);
        setPlaying(data.data.playing);
        setCurrentTime(data.data.currentTime);
        if (videoRef.current) {
          videoRef.current.currentTime = data.data.currentTime;
          if (data.data.playing) videoRef.current.play();
          else videoRef.current.pause();
        }
      } else if (data.type === 'message') {
        setMessages(prevMessages => [...prevMessages, data.message]);
      } else if (data.type === 'roomData') {
        setUrl(data.data.videoUrl);
        setPlaying(data.data.playing);
        setCurrentTime(data.data.currentTime);
      }
    };
  
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    return () => {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);
  

  const handlePlayPause = () => {
    if (ws.current) {
      const newPlayingState = !playing;
      ws.current.send(JSON.stringify({
        type: 'sync',
        videoUrl: url,
        playing: newPlayingState,
        currentTime: videoRef.current.currentTime
      }));
      setPlaying(newPlayingState);
    }
  };

  const handleChangeVideo = (e) => {
    setUrl(e.target.value);
    if (ws.current) {
      ws.current.send(JSON.stringify({
        type: 'sync',
        videoUrl: e.target.value,
        playing,
        currentTime: videoRef.current.currentTime
      }));
    }
  };

  const handleSeek = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({
        type: 'sync',
        videoUrl: url,
        playing,
        currentTime: videoRef.current.currentTime
      }));
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 'message', message }));
        setMessage('');
      } else {
        console.error('WebSocket is not open. ReadyState:', ws.current.readyState);
      }
    }
  };
  

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.youtuberoom}>
      <div className={styles.videocontainer}>
        <video
          ref={videoRef}
          src={url}
          controls
          autoPlay
          onTimeUpdate={handleSeek}
        />
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Video URL"
            value={url}
            onChange={handleChangeVideo}
          />
          <button className={styles.button1} onClick={handlePlayPause}>
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <div className={styles.chatcontainer}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.bottombar}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button className={styles.button2} onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

