const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const colors = require('colors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Create an array to store all conversation history
const chatHistory = [];

const initialMessage = {
  role: "system",
  content: "You are called Bumper, a smart study bot designed to help educate students. Answer every question as if you are a teacher, and refuse to answer anything that does not relate to school in some sense. This means you can only answer questions related to a subject that can be taught in school, limited to Physics, Math, Science, Coding, English, or Engineering related questions"
};
chatHistory.push(["system", initialMessage.content]);

app.post('/chatroom', async (req, res) => {
  const userInput = req.body.userInput;

  try {
    // Constructing messages by iterating over the history
    const messages = chatHistory.map(([role, content]) => ({ role, content }));

    // Adding the latest user input to the message history
    messages.push({ role: 'user', content: userInput });

    // Calling the OpenAI API with the user's input
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const completionText = chatCompletion.choices[0].message.content;

    // Exiting
    if (userInput.toLowerCase() === 'exit') {
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
      console.log(colors.blue('Bumper: ') + completionText);
      return res.json({ message: completionText });
    }

    // Update history with user input and assistant response
    chatHistory.push(['user', userInput]);
    chatHistory.push(['assistant', completionText]);
    console.log(colors.blue('Bumper: ') + completionText);

    return res.json({ message: completionText });
  } catch (error) {
    console.error(colors.magenta(error));
    return res.status(500).json({ error: 'An error occurred' });
  }
});

let videoState = {
  url: '',
  playing: false,
  currentTime: 0
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send current video state to the newly connected client
  sendMessage(ws, { type: 'videoState', data: videoState });

  // Handle messages from clients
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'playPause':
        videoState.playing = data.data.playing;
        broadcastMessage({ type: 'playPause', data: data.data });
        break;
      case 'changeVideo':
        videoState.url = data.data.url;
        videoState.currentTime = 0;
        broadcastMessage({ type: 'changeVideo', data: data.data });
        break;
      case 'timeSync':
        videoState.currentTime = data.data.currentTime;
        broadcastMessage({ type: 'timeSync', data: data.data });
        break;
      case 'chatMessage':
        broadcastMessage({ type: 'chatMessage', data: data.data });
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function sendMessage(ws, message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open. ReadyState:', ws.readyState);
  }
}

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    sendMessage(client, message);
  });
}

server.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});

/*

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = {};

wss.on('connection', (ws) => {
  let currentRoom = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    if (data.type === 'join') {
      currentRoom = data.room;
      if (!rooms[currentRoom]) {
        rooms[currentRoom] = { users: [], videoUrl: '', playing: false, currentTime: 0 };
      }
      rooms[currentRoom].users.push(ws);
      ws.send(JSON.stringify({ type: 'roomData', data: rooms[currentRoom] }));
    } else if (data.type === 'sync') {
      if (rooms[currentRoom]) {
        rooms[currentRoom].videoUrl = data.videoUrl;
        rooms[currentRoom].playing = data.playing;
        rooms[currentRoom].currentTime = data.currentTime;
        rooms[currentRoom].users.forEach(user => {
          if (user !== ws) user.send(JSON.stringify({ type: 'sync', data: rooms[currentRoom] }));
        });
      }
    } else if (data.type === 'message') {
      rooms[currentRoom].users.forEach(user => {
        if (user !== ws) user.send(JSON.stringify({ type: 'message', message: data.message }));
      });
    }
  });

  ws.on('close', () => {
    if (currentRoom && rooms[currentRoom]) {
      rooms[currentRoom].users = rooms[currentRoom].users.filter(user => user !== ws);
      if (rooms[currentRoom].users.length === 0) {
        delete rooms[currentRoom];
      }
    }
  });
});

server.listen(3000, () => {
  console.log('WebSocket server is listening on port 8080');
});
*/