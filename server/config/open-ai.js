import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Explicit initlaization ensures we load in the environment variables

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export default openai;