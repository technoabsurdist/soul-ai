import dotenv from 'dotenv'; 
import OpenAI from "openai";

dotenv.config(); 
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const generateTitle = async (text: string) => {
    const prompt = `Original text: ${text}\nVery short (strictly less than 8 words) title:`;
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant helping figure out titles for different texts." },
            { role: "user", content: prompt}
        ],
        model: "gpt-3.5-turbo",
      });

    const title = completion.choices[0].message.content || ""; 
    return title; 
}