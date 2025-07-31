// Done by Hanjun
import {ChatHistoryTemplate} from "@/types";
import { Person, SmartToy } from '@mui/icons-material';

export default function MessageBubble({message}:{message:ChatHistoryTemplate}) {
    return (
        <div>
            <div
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
                <div className={`flex items-start max-w-[70%] space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser
                            ? 'bg-violet-600 text-white'
                            : 'bg-violet-100 text-violet-700 border-2 border-violet-300'
                    }`}>
                        {message.isUser ? <Person className="w-4 h-4" /> : <SmartToy className="w-4 h-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.isUser
                            ? 'bg-violet-600 text-white rounded-br-md'
                            : 'bg-violet-100 text-violet-900 border border-violet-200 rounded-bl-md'
                    }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                            message.isUser ? 'text-violet-200' : 'text-violet-500'
                        }`}>
                            {message.timestamp}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}