"use client";

import { useState } from "react";
import styled from "styled-components"
import { sendChatMessage } from "@/lib/SendMessage"


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
            let rollingResponse = '';
            for await (const chunk of answer) {
                rollingResponse += String(chunk.text);
                setResponse(String(rollingResponse));
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            }
            catch (error) {
            console.log(error);
            }
            setInput('');
    };


    return (
        <main>
            <StyledHeader>Projects</StyledHeader>

            {/* There is missing some spacing between the numbers and the buttons that is there in the mp-1,
            but I don't really know it isn't doing the same here. But other than that every thing is the same.
            */}
            <StyledCalculator>
                <div>
                    <input value={input} onChange={(e) => setInput(e.target.value)}/>
                    <StyledButton onClick={handleSubmit}>Send</StyledButton>
                    <h3>{response}</h3>
                </div>
            </StyledCalculator>
        </main>
    )
}