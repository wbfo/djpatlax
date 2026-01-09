'use client';

import { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaMicrophone, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useChat } from '@/hooks/useChat';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    // UI Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Chat Logic
    const {
        messages,
        input,
        setInput,
        isLoading,
        bookingConfirmation,
        isListening,
        isVoiceEnabled,
        handleSend,
        toggleVoice,
        toggleListening
    } = useChat();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-green text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
                    aria-label="Open chat"
                >
                    <FaComments className="w-7 h-7" />
                    {/* Notification dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-green rounded-full animate-pulse"></div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[600px] flex flex-col glass-effect rounded-card border border-white border-opacity-20 shadow-2xl animate-scale-in md:w-[400px]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white border-opacity-10 gradient-green rounded-t-card">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                                🎧
                            </div>
                            <div>
                                <div className="font-bold text-white">DJ Pat Lax</div>
                                <div className="text-xs text-white text-opacity-80">Booking Assistant</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleVoice}
                                className={`text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors ${isVoiceEnabled ? 'bg-white bg-opacity-10' : ''}`}
                                aria-label="Toggle voice output"
                                title={isVoiceEnabled ? "Mute voice" : "Enable voice"}
                            >
                                {isVoiceEnabled ? <FaVolumeUp className="w-4 h-4" /> : <FaVolumeMute className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                                aria-label="Close chat"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'gradient-green text-white'
                                        : 'glass-effect border border-white border-opacity-10'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                                    <div className="text-xs opacity-60 mt-1">
                                        {new Date().toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="glass-effect border border-white border-opacity-10 rounded-2xl px-4 py-3">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {bookingConfirmation && (
                            <div className="glass-effect border-2 border-primary-green rounded-card p-4">
                                <div className="text-sm font-bold text-primary-green mb-2">
                                    ✅ Booking Inquiry Sent!
                                </div>
                                <div className="text-xs space-y-1 text-gray-300">
                                    <div>Reference: <span className="font-mono text-primary-green">{bookingConfirmation.referenceNumber}</span></div>
                                    <div>Sent to: bookings@patlax.com</div>
                                    <div>Response time: Within 24 hours</div>
                                    {bookingConfirmation.error && (
                                        <div className="text-red-400 mt-2">{bookingConfirmation.error}</div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white border-opacity-10">
                        <div className="flex gap-2">
                            <button
                                onClick={toggleListening}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening
                                        ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                                        : 'glass-effect border border-white border-opacity-10 text-gray-300 hover:text-white hover:border-white'
                                    }`}
                                aria-label={isListening ? "Stop listening" : "Start voice input"}
                            >
                                <FaMicrophone className="w-5 h-5" />
                            </button>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={isListening ? "Listening..." : "Ask about booking, music..."}
                                className="flex-1 px-4 py-3 rounded-full glass-effect border border-white border-opacity-10 focus:border-primary-green outline-none text-sm"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="w-12 h-12 rounded-full gradient-green text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                                aria-label="Send message"
                            >
                                <FaPaperPlane className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-xs text-gray-400 mt-2 text-center">
                            Powered by AI • Response within 24hrs
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
