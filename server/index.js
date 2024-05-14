import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    
  console.log(colors.bold.green('Welcome, I am your personal chatbot assistant! How can I help you today?'));
  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
        // Construct messages by iterating over conversation history
        const messages = chatHistory.map(([role, content]) => ({ role, content }))

        // Add latest user input
        messages.push({ role: 'user', content: userInput }); 

        // Call the API with the user input
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });
2
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

