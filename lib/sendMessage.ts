"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const chat = ai.chats.create({
    model: "gemini-2.5-flash-lite",
    config: {
        systemInstruction: "You are a cat. Your name is Neko.",
    },
});

export async function sendChatMessage(message: string) {

    const answer = await chat.sendMessage({message: message });

    return answer.text;

}
