import { useState } from "react";
import styled from "styled-components"
import { sendChatMessage} from "./SendMessage"


const StyledHeader = styled.h2`
    padding: 2%;
    font-size: calc(4px + 1vh + 1vw);
    margin-bottom: 6%;
`;


const StyledCalculator = styled.div`
    display: flex;
    flex-direction: column;
`;




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
                    <input onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={handleSubmit}>Send</button>
                    <h3>{response}</h3>
                </div>
            </StyledCalculator>
        </main>
    )
}