"use client";
import Chat from "@/components/Chat";
import {sendChatMessage} from "@/lib/sendMessage";
import {useEffect, useState, useRef} from "react";
import {useSearchParams} from "next/navigation";
import {ChatHistoryTemplate} from "@/types";
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatHistoryTemplate[]>([])
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('query');
    const hasProcessedInitialQuery = useRef(false);

    useEffect(() => {
        const processInitialQuery = async () => {
            if (initialQuery && !hasProcessedInitialQuery.current) {
                hasProcessedInitialQuery.current = true;
                try {
                    const decodedQuery = decodeURIComponent(initialQuery);
                    const initialResponse = await sendChatMessage(decodedQuery);

                    if (initialResponse === undefined) {
                        console.log("initial response empty");
                        return;
                    }

                    setMessages(prevMessages => [...prevMessages, {id:uuidv4(), isUser:true, content:initialResponse, timestamp:Date.now().toString()}]);
                } catch (error) {
                    console.error("Error processing initial query:", error);
                }
            }
        }
        processInitialQuery();
    }, [initialQuery]);
    return (
        <>
            <Chat initialMessage={messages}/>
        </>
    );
}