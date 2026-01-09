import { useState, useRef, useEffect } from 'react';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface BookingConfirmation {
    referenceNumber: string;
    sent: boolean;
    error?: string;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hey! 👋 I'm DJ Pat Lax's booking assistant. I can help you with bookings, tell you about upcoming events, or answer any questions about Pat's music. What can I help you with?",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [bookingConfirmation, setBookingConfirmation] = useState<BookingConfirmation | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.speechSynthesis.cancel();
            return () => {
                window.speechSynthesis.cancel();
                if (recognitionRef.current) {
                    recognitionRef.current.stop();
                }
            };
        }
    }, []);

    const speak = (text: string) => {
        if (!isVoiceEnabled || typeof window === 'undefined') return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    };

    const startListening = () => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser doesn't support voice input. Please stick to typing!");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => {
                const newValue = prev ? `${prev} ${transcript}` : transcript;
                return newValue;
            });
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() && !isListening) return;
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            const assistantMessage = { role: 'assistant' as const, content: data.message };

            setMessages(prev => [
                ...prev,
                assistantMessage,
            ]);

            if (isVoiceEnabled) {
                speak(data.message);
            }

            if (data.bookingConfirmation) {
                setBookingConfirmation(data.bookingConfirmation);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = "Sorry, I'm having trouble connecting right now. Please try again or email bookings@patlax.com directly.";
            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: errorMessage,
                },
            ]);
            if (isVoiceEnabled) speak(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleVoice = () => {
        const newState = !isVoiceEnabled;
        setIsVoiceEnabled(newState);
        if (!newState) {
            window.speechSynthesis.cancel();
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return {
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
    };
}
