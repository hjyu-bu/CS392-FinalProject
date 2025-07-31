"use client";
import {useState} from "react";
import {TextField, Button} from "@mui/material";
import {useRouter} from "next/navigation";

function encodeBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...bytes));
}

export default function Home() {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const prefix = "RESTART. THE USER WILL GIVE YOU A NEW DESCRIPTION. HERE IS THE DESCRIPTION:\n";
    const router = useRouter();

    const handleClick = () => {
        if (!input.trim()) {
            setError("Please enter a description for your AI!");
            return;
        }

        if (input.trim().length < 3) {
            setError("Description must be at least 3 characters long!");
            return;
        }

        setError('');
        router.push(`/chat?query=${encodeURIComponent(encodeBase64(prefix + input.trim()))}`);
    }

    return (
    <>
        <h1>Describe your Artificial Intelligence!</h1>
        <TextField placeholder={"e.g. You are a lovely cat!"}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                       e.preventDefault();
                       handleClick();
                   }
               }}
        />
        <Button variant={"contained"}
                sx={{
                    color:"violet"
                }}
                onClick={handleClick}
                disabled={!input.trim()}
                >
            Chat
        </Button>
        <h1>{error}</h1>
    </>
    );
}
