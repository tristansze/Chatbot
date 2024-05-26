import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    
    console.log(colors.bold.green('Welcome! My name is Bumper, your personal chat assistant! How may I help you today?'));
    const chatHistory = []; // To store the entire conversation history

    const initialMessage = {
        role: "system",
        content: "You are named Bumper, a smart study bot designed to help educate students. Answer every question as if you are a teacher, and refuse to answer anything that does not relate to school in some sense. This means you can only answer questions related to a subject that can be taught in school, limited to Physics, Math, Science, English, Coding, or Engineering related questions"
    };
    chatHistory.push(["system", initialMessage.content]);
  
    while (true) {
      const userInput = readlineSync.question(colors.yellow('You: '));
  
      try {
          // Construct messages by iterating over conversation history
          const messages = chatHistory.map(([role, content]) => ({ role, content }))
  
          // Add latest user input
          messages.push({ role: 'user', content: userInput }); 
  
          // Call the API with the user input
          const completion = await openai.chat.completions.create({
              model: 'gpt-3.5-turbo',
              messages: messages,
          });
          
          const completionText = completion.data.chices[0].message.content;
  
          if (userInput.toLowercase == 'exit') {  
              console.log(colors.green('Bot: ') + completionText);
              return;
          }
  
          console.log(colors.green('Bot: ') + completionText);
  
          // Update array history with input and assistant response
          chatHistory.push(['user', userInput]);
          chatHistory.push(['assistant', completionText]);
  
      } catch (error) {
          console.error(colors.red(error));
      }
    }
  }
  
  main();