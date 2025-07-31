// Done by Hanjun
import { SmartToy } from '@mui/icons-material';
import { ChatHistoryTemplate } from "@/types";
import MessageBubble from "@/components/MessageBubble";

/*
    This component is a container for all message bubbles.
    We will receive a list of messages and map over them, using MessageBubble component for each.
    isTyping essentially holds the 'loading' state for AI responses, and will show a loading animation while
    the user waits for the AI to generate a response.
 */
export default function MessagesContainer({messages, isTyping}:{messages:ChatHistoryTemplate[], isTyping:boolean}) {

    return (
        <div className="flex-1 flex justify-center px-4 py-6 overflow-hidden">
            <div className="w-full max-w-[80vw] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                    {messages.map((message:ChatHistoryTemplate) => (
                        <MessageBubble message={message} key={message.id} />
                    ))}

                    {isTyping && (
                        <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-start max-w-[70%] space-x-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 text-violet-700 border-2 border-violet-300 flex items-center justify-center">
                                    <SmartToy className="w-4 h-4" />
                                </div>
                                <div className="bg-violet-100 border border-violet-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}