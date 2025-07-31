/*
    This page was done by Adam and Hanjun.
    Functionality: Done by Hanjun
    Styling: Done by Adam
 */

"use client";
import {useState} from "react";
import {TextField, Button} from "@mui/material";
import {useRouter} from "next/navigation";

/*
    Encode URI component using base64 encoding-decoding
    We wanted to hide the fact that the initial description of AI is being sent through URLs,
    so we decided to encode the initial description.
 */
function encodeBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...bytes));
}

/*
    This is the home page.
    It has an input area where the user can write description for the AI that they want to create!
    The description will then be encoded and sent to /chat page.
 */
export default function Home() {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const prefix = "RESTART. THE USER WILL GIVE YOU A NEW DESCRIPTION. HERE IS THE DESCRIPTION:\n";
    const router = useRouter();

    /*
        Instead of Link, we used useRouter since we wanted to do a simple verification of user input.
        If the user sends an empty or too short description, it will notify the user to write longer descriptions.
     */
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
    <main className="flex flex-col pt-50">
        <div className="w-[60%] m-auto bg-white border-1 border-violet-200 shadow-lg">
            <div className=" m-auto p-4 flex flex-col justify-center">
                <div className="flex flex-col items-center space-x-3">
                    <h1 className="pb-4 text-2xl">Describe your Artificial Intelligence!</h1>
                    <TextField multiline
                               placeholder={"e.g. You are a lovely cat!"}
                               value={input}
                               onChange={(e) => setInput(e.target.value)}
                               onKeyDown={(e) => {
                                   if (e.key === 'Enter' && !e.shiftKey) {
                                       e.preventDefault();
                                       handleClick();
                                   }
                               }}
                               className="w-full p-4 bg-violet-50 rounded-xl border-violet-200 text-violet-900 placeholder-violet-400"
                    />
                </div>
                <div className="flex flex-row m-auto justify-between pt-5">
                    <p className="text-xs text-violet-500 mt-2 text-center px-10">
                        Press Enter to send • Shift + Enter for new line
                    </p>
                    <Button variant={"contained"}
                            sx={{
                                color:"violet"
                            }}
                            onClick={handleClick}
                            disabled={!input.trim()}
                            className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                        Chat
                    </Button>
                </div>
            </div>
        </div>
        <h1>{error}</h1>
    </main>
    );
}
