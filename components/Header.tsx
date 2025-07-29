import Link from "next/link";


export default function Header() {
    return (
        <header className="bg-purple-800 text-white text-center p-4">
            <Link href="/" className="text-5xl hover:text-gray-300">
                AI Chatbot
            </Link>
            <p>Customize it yourself</p>
        </header>

    )
}