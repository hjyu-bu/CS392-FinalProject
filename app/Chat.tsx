"use client";

import { useState } from "react";
import styled from "styled-components"
import { sendChatMessage } from "@/lib/sendMessage"



const StyledHeader = styled.h2`
    padding: 2%;
    font-size: calc(4px + 1vh + 1vw);
    margin-bottom: 6%;
`;


const StyledCalculator = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled.button`
    background-color: #3a4454;
    color: white;
    border: none;
    padding: 8px 16px;  // Add padding
    cursor: pointer;    // Show it's clickable
    min-height: 40px;   // Ensure adequate height
`



export default function Chat() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        try {
            const answer = await sendChatMessage(input);
            setResponse(String(answer));
        }
        catch (error) {
            console.log(error);
        }
        setInput('');
    };


    return (
        <main>
            <StyledHeader>Projects</StyledHeader>


            <StyledCalculator>
                <div>
                    <input value={input} onChange={(e) => setInput(e.target.value)}/>
                    <StyledButton onClick={handleSubmit}>Send</StyledButton>
                    <h3>{String(response)}</h3>
                </div>
            </StyledCalculator>
        </main>
    )
}