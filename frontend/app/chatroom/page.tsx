"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_ANONCHAT_BACKEND_API_BASE_URL || "http://localhost:8080";

interface Message {
    sender: string;
    content: string;
    type: string;
}

export default function ChatRoom() {
    const searchParams = useSearchParams()
    const [username, setUsername] = useState<string>("Guest");
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [wsError, setWsError] = useState(false);
    const [roomCheckOK, setRoomCheckOK] = useState(false);
    const chatboxRef = useRef<HTMLDivElement>(null);

    const room_id = searchParams.get("room_id");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/rooms/${room_id}/check`, { method: "GET" });

                if (response.status === 404) {
                    throw new Error("Chat room not found. Please create a new room.");
                } else if (response.status === 403) {
                    throw new Error("Chat room is full. Please create a new room by going to the homepage.");
                } else if (response.status === 200) {
                    setRoomCheckOK(true);
                    if (room_id) {
                        const ws = new WebSocket(`${API_BASE_URL}/api/rooms/${room_id}/join`);
                        ws.onmessage = (event: MessageEvent) => {
                            const data: Message = JSON.parse(event.data);
                            // console.log("Received message:", data);
                            if (data.type === "clientName") setUsername(data.content);
                            if (data.type === "chat" || data.type === "info") setMessages((prev) => [...prev, data]);
                        };
                        ws.onerror = (error: Event) => {
                            // console.log("WebSocket error:", error);
                            setSocket(null);
                            setWsError(true);
                            setUsername("");
                            toast.error("WebSocket error occurred." + error);
                        };
                        ws.onclose = (event: CloseEvent) => {
                            // console.log("WebSocket closed:", event);
                            setWsError(true);
                            setUsername("");
                            setSocket(null);
                            toast.error("WebSocket connection closed unexpectedly.");
                        };
                        setSocket(ws);
                    }
                }
            } catch (error) {
                let errorMessage = "Sorry, there is an unexpected error. You can try to refresh the page, or create a new room by going to the homepage.";
                toast.error(errorMessage);

                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                
                console.log(errorMessage);
            }
        })();
    }, [room_id]);

    useEffect(() => {
        if (!roomCheckOK) return; // Only run if roomCheckOK is true

        window.onbeforeunload = function () {
            return "Are you sure you want to leave? You will lose your chat history.";
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, [roomCheckOK]);

    useEffect(() => {
        return () => {
            if (socket) socket.close();
        };
    }, [socket]);

    const sendMessage = () => {
        if (socket && inputMessage.trim() && socket.readyState === WebSocket.OPEN) {
            // console.log("Sending message:", inputMessage);
            socket.send(JSON.stringify(inputMessage));
            setInputMessage("");
        }
    };

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">
                {roomCheckOK && (
                    <>
                        <h2 className="text-2xl font-semibold text-white-800">You are {username}</h2>
                        <button
                            hidden={wsError}
                            onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Chatroom link copied to clipboard!") }}
                            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            Copy Chatroom Link
                        </button>

                        <div
                            ref={chatboxRef}
                            className="chatbox mt-6 w-2/3 p-4 bg-white rounded-lg shadow-md h-96 overflow-y-auto border border-gray-300 relative"
                        >
                            {wsError && (
                                <div className="absolute inset-0 bg-white bg-opacity-10 flex flex-col items-center justify-center z-10">
                                    <img src="/error.svg" alt="Error" className="w-24 h-24 mb-4" />
                                    <p className="text-red-600 font-bold">
                                        That Suxx! You can try to refresh the page, or create a new room by going to <a href="/" className="text-blue-600">Home</a>.
                                    </p>
                                </div>
                            )}
                            {!wsError && messages.map((msg, index) => (
                                <p
                                    key={index}
                                    className={
                                        msg.type === "chat"
                                            ? "text-gray-700"
                                            : msg.content.indexOf("joined") != -1
                                                ? "text-blue-500"
                                                : "text-red-600"
                                    }
                                >
                                    {msg.sender}: {msg.content}
                                </p>
                            ))}
                        </div>

                        <div className="flex mt-4 w-2/3">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                                placeholder="Type a message"
                                className="flex-1 p-2 border rounded-md mr-2 text-gray-700"
                                disabled={wsError}
                            />
                            <button onClick={sendMessage}
                                disabled={inputMessage.trim() === "" || socket?.readyState !== WebSocket.OPEN}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${inputMessage.trim() === '' || socket?.readyState !== WebSocket.OPEN ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
                {!roomCheckOK && (
                    <img src="/panic.jpg" alt="Error" className="rounded-full h-[50vh] border-[6px] border-white bg-white" />
                )}
            </main>
            <Footer />
        </div>
    );
}
