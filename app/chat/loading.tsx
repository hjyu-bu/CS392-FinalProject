// Done by Hanjun

// An animated loading page for /chat
export default function Loading() {
    return (
        <div className="animate-pulse-custom flex flex-col items-center justify-center gap-4 text-center">
            <div
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Creating...</h3>
            <p className="text-gray-500">Please wait while we build your own personalized AI...!</p>
        </div>
    );
}