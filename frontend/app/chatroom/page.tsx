"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { toast } from "react-hot-toast";
import Link from "next/link";

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
    const [connectionError, setConnectionError] = useState<string>("Not Connected"); // init error
    const chatboxRef = useRef<HTMLDivElement>(null);

    const room_id = searchParams.get("room_id");

    useEffect(() => {
        if (room_id) {
            const ws = new WebSocket(`${API_BASE_URL}/api/rooms/${room_id}/join`);
            
            ws.onopen = () => {
                setConnectionError("");
            };
            
            ws.onmessage = (event: MessageEvent) => {
                const data: Message = JSON.parse(event.data);
                // console.log("Received message:", data);
                if (data.type === "clientName") setUsername(data.content);
                if (data.type === "chat" || data.type === "info") setMessages((prev) => [...prev, data]);
            };
            
            ws.onerror = (error: Event) => {
                console.log("WebSocket error:", error);
                setSocket(null);
                setUsername("");
                setConnectionError("WebSocket error occurred");
                toast.error("WebSocket error occurred");
            };
            
            ws.onclose = (event: CloseEvent) => {
                console.log("WebSocket closed:", event);
                setSocket(null);
                setUsername("");
                setConnectionError("WebSocket closed");
                toast.error("WebSocket closed");
            };
            
            setSocket(ws);
        }
    }, [room_id]);

    useEffect(() => {
        if (connectionError !== "") return; // Only run if NO connection error

        window.onbeforeunload = function () {
            return "Are you sure you want to leave? You will lose your chat history.";
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, [connectionError]);

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
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 p-4">
            {!connectionError && (
                <>
                    <h2 className="text-2xl font-semibold text-white mb-4">You are {username}</h2>
                    <button
                        onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Chatroom link copied to clipboard!") }}
                        className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Copy Chatroom Link
                    </button>

                    <div
                        ref={chatboxRef}
                        className="chatbox w-full max-w-4xl p-4 bg-white rounded-lg shadow-md h-96 overflow-y-auto border border-gray-300 relative"
                    >
                        {messages.map((msg, index) => (
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

                    <div className="flex mt-4 w-full max-w-4xl">
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
            {connectionError && (
                <div className="flex flex-col items-center justify-center">
                    {/* <img src="/panic.jpg" alt="Error" className="rounded-full h-[50vh] border-[6px] border-white bg-white" /> */}
                    <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md max-w-md text-center">
                        <p className="font-bold">Connection Failed</p>
                        <p>{connectionError}</p>
                        <p className="mt-2">
                            <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                                Go to homepage to create a new room
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
