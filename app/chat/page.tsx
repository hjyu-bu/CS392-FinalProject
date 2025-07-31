/*
 This page was done by Adam and Hanjun.
 Functionality: Mostly done by Adam with help from Hanjun
 Styling: Done by Hanjun
 */

"use client";
import {sendChatMessage} from "@/lib/sendMessage";
import React, {useEffect, useState, useRef} from "react";
import {useSearchParams} from "next/navigation";
import {ChatHistoryTemplate} from "@/types";
import { v4 as uuidv4 } from 'uuid';
import MessagesContainer from "@/components/MessagesContainer";
import SendIcon from '@mui/icons-material/Send';

/*
    Decode URI component using base64 encoding-decoding
    We wanted to hide the fact that the initial description of AI is being sent through URLs,
    so we decided to encode the initial description.
 */
function decodeBase64(base64: string | null): string {
    if (!base64) return "Query not provided. Please ask the user to provide a description of their AI!";
    const binary = atob(base64);
    const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)));
    return new TextDecoder().decode(bytes);
}

/*
    This is the main chat page.
    It contains the message container(which displays messages) and the input area.
    It also sends api requests to Gemini using server-side functions.
 */
export default function ChatPage() {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const errorMessage = "I'm sorry, I could not generate an appropriate response. Please try again.";
    const initialErrorMessage = "I'm sorry, I could not receive your initial description. Please write another description.";
    const [messages, setMessages] = useState<ChatHistoryTemplate[]>([])
    const searchParams = useSearchParams();
    const initialQuery = decodeBase64(searchParams.get('query'));
    const hasProcessedInitialQuery = useRef(false);

    /*
        Using the initial description user provided, sends an api call to gemini and generates an initial response.
        useEffect to call asynchronous server functions, with hasProcessedInitialQuery ref to make sure that this only happens once.
     */
    useEffect(() => {
        const processInitialQuery = async () => {
            if (initialQuery && !hasProcessedInitialQuery.current) {
                hasProcessedInitialQuery.current = true;
                setIsTyping(true);
                try {
                    const decodedQuery = decodeURIComponent(initialQuery);
                    let initialResponse = await sendChatMessage(decodedQuery);

                    if (initialResponse === undefined) {
                        console.log("initial response undefined");
                        initialResponse = errorMessage;
                    }

                    setMessages(prevMessages => [...prevMessages, {id:uuidv4(), isUser:false, content:initialResponse, timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toString()}]);
                } catch (error) {
                    console.error("Error processing initial query:", error);
                    setMessages(prevMessages => [...prevMessages, {id:uuidv4(), isUser:false, content:initialErrorMessage, timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toString()}]);
                } finally {
                    setIsTyping(false);
                }
            }
        }
        processInitialQuery();
    }, [initialQuery]);

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setIsTyping(true);
        try {
            setMessages(prev => [...prev, {id:uuidv4(), isUser:true, content:input, timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toString()}]);
            const answer = await sendChatMessage(input);
            setMessages(prev => [...prev, {id:uuidv4(), isUser:false ,content:String(answer), timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toString()}]);
        }
        catch (error) {
            console.log("Error while generating a response, " + error);
            setMessages(prev => [...prev, {id:uuidv4(), isUser:false ,content:errorMessage, timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toString()}]);
        }
        setInput('');
        setIsTyping(false);
    };

    const handleKeyPress = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    /*
        Messages and input-area are in a flex-box, with input sticky to the bottom of the screen.
        Input-area is also another flex-box, with decorated textarea and button(also with MUI icon!).
        Utilizes onKeyDown for enter-triggered button pushing.
     */
    return (
        <div className="flex flex-col h-screen">
            <MessagesContainer messages={messages} isTyping={isTyping}/>
            <div className="sticky bottom-0 bg-white border-t border-violet-200 shadow-lg">
                <div className="max-w-[80vw] mx-auto px-4 py-4">
                    <div className="flex items-end space-x-3">
                        <div className="flex-1 relative">
                              <textarea
                                  value={input}
                                  onChange={(e) => setInput(e.target.value)}
                                  onKeyDown={handleKeyPress}
                                  placeholder="Type your message here..."
                                  rows={1}
                                  className="w-full px-4 py-3 bg-violet-50 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 resize-none text-violet-900 placeholder-violet-400 transition-all duration-200"
                              />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!input.trim()}
                            className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                        >
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-violet-500 mt-2 text-center">
                        Press Enter to send • Shift + Enter for new line
                    </p>
                </div>
            </div>
        </div>
    );
}