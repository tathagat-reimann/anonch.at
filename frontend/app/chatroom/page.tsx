"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE_URL = process.env.ANONCHAT_BACKEND_API_BASE_URL || "http://localhost:8080";

interface Message {
    sender: string;
    content: string;
    type: string;
}

export default function ChatRoom() {
    window.onbeforeunload = function () {
        return "Are you sure you want to leave? You will lose your chat history.";
    }

    const router = useRouter();
    const searchParams = useSearchParams()
    const [username, setUsername] = useState<string>("Guest");
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const room_id = searchParams.get("room_id");

    useEffect(() => {
        if (room_id) {
            const ws = new WebSocket(`${API_BASE_URL}/api/rooms/${room_id}/join`);
            ws.onmessage = (event: MessageEvent) => {
                const data: Message = JSON.parse(event.data);
                // console.log("Received message:", data);
                if (data.type == "clientName") setUsername(data.content);
                if (data.type == "chat" || data.type == "info") setMessages((prev) => [...prev, data.sender + ": " + data.content]);
            };
            setSocket(ws);
        }
    }, [room_id]);

    const sendMessage = () => {
        if (socket && inputMessage.trim() && socket.readyState === WebSocket.OPEN) {
            // console.log("Sending message:", inputMessage);
            socket.send(JSON.stringify(inputMessage));
            setInputMessage("");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">
                <div><Toaster /></div>
                <h2 className="text-2xl font-semibold text-white-800">Welcome, {username}</h2>
                <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Chatroom link copied to clipboard!") }}
                    className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                    Copy Chatroom Link
                </button>

                <div className="chatbox mt-6 w-2/3 p-4 bg-white rounded-lg shadow-md h-96 overflow-y-auto border border-gray-300">
                    {messages.map((msg, index) => (
                        <p key={index} className="text-gray-700">{msg}</p>
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
                    />
                    <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Send
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
