// Done by Adam
import Link from "next/link";

/*
It's a header component that has a Link that returns the user to the homepage.
The color of the title becomes darker when the user hovers over it.
 */
export default function Header() {
    return (
        <header className="bg-purple-800 text-white text-center p-4 sticky top-0">
            <Link href="/" className="text-5xl hover:text-gray-300">
                AI Chatbot
            </Link>
            <p>Customize it yourself</p>
        </header>

    )
}