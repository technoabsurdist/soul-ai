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

export const modelResponse = async (username: string, text: string, journalEntries: Array<object>) => {
    const prompt = `Original text: ${text}\nModel response:`;
    const journalContext = journalEntries.map((entry, idx) => ({ role: "user", content: `Journal Entry ${idx + 1}: ${entry}` }));
    const context = [
        { role: "system", content: `You are a helpful mental-health coach, psychologist, and assistant answering questions for ${username}.` },
        { role: "system", content: "Here's some context about the user from their journal that you should have to answer questions their questions most effectively:" },
        ...journalContext,
    ]
    console.log("context", context)
    const completion = await openai.chat.completions.create({
        messages: [
            ...context as any,
            { role: "user", content: prompt}
        ],
        model: "gpt-3.5-turbo",
      });

    const response = completion.choices[0].message.content || ""; 
    return response; 
}