"use client";
import Link from "next/link";
import {useState} from "react";
import {TextField, Button} from "@mui/material";

export default function Home() {
    const [input, setInput] = useState('');

    return (
    <>
        <h1>Describe your Artificial Intelligence!</h1>
        <TextField placeholder={"e.g. You are a lovely cat!"}
               value={input}
               onChange={(e) => setInput(e.target.value)}
        />
        <Link href={{pathname:"/chat", query:{query:encodeURIComponent(input)}}}>
            <Button variant={"contained"}
                    sx={{
                        color:"violet"
                    }}
                    >
                Chat
            </Button>
        </Link>
    </>
    );
}
