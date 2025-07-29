"use client";

import { sendChatMessage } from "@/lib/sendMessage"
import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Paper,
    Typography,
    Avatar,
    Divider,
    Container
} from '@mui/material';
import { Send as SendIcon, Person, SmartToy } from '@mui/icons-material';
import styled from 'styled-components';
import { ChatHistoryTemplate } from "@/types";
import { v4 as uuidv4 } from 'uuid';

const MessagesContainer = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const MessageBubble = styled(Box)<{$isUser?:boolean}>`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 8px;
  ${(props) => props.$isUser && `
    flex-direction: row-reverse;
  `}
`;

const BubbleContent = styled(Paper)<{$isUser?:boolean}>`
  max-width: 70%;
  padding: 12px 16px !important;
  border-radius: ${props => props.$isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'} !important;
  background: ${props => props.$isUser ? '#2196f3' : 'rgba(255, 255, 255, 0.95)'} !important;
  color: ${props => props.$isUser ? 'white' : '#333'} !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
`;


export default function Chat({initialMessage}:{initialMessage:ChatHistoryTemplate[]}) {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [messages, setMessages] = useState<ChatHistoryTemplate[]>(initialMessage);

    const handleSubmit = async () => {
        try {
            setMessages(prev => [...prev, {id:uuidv4(), isUser:true, content:input, timestamp:Date.now().toString()}]);
            const answer = await sendChatMessage(input);
            setResponse(String(answer));
            setMessages(prev => [...prev, {id:uuidv4(), isUser:false ,content:String(answer), timestamp:Date.now().toString()}]);
        }
        catch (error) {
            console.log(error);
        }
        setInput('');
    };


    return (
        <main>
            {/* Messages */}
            <MessagesContainer>
                {messages.map((message) => (
                    <MessageBubble key={message.id} $isUser={message.isUser}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: message.isUser ? '#2196f3' : '#f50057'
                            }}
                        >
                            {message.isUser ? <Person /> : <SmartToy />}
                        </Avatar>
                        <Box>
                            <BubbleContent $isUser={message.isUser} elevation={2}>
                                <Typography variant="body1">
                                    {message.content}
                                </Typography>
                            </BubbleContent>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    ml: message.isUser ? 0 : 1,
                                    mr: message.isUser ? 1 : 0,
                                    display: 'block',
                                    textAlign: message.isUser ? 'right' : 'left',
                                    mt: 0.5
                                }}
                            >
                                {message.timestamp}
                            </Typography>
                        </Box>
                    </MessageBubble>
                ))}
            </MessagesContainer>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)}/>
                <IconButton onClick={handleSubmit} sx={{
                    bgcolor: '#2196f3',
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#1976d2'
                    }}}>Send</IconButton>
                <h3>{response}</h3>
            </div>
        </main>
    )
}