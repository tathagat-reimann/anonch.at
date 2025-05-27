"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Message {
    username?: string;
    message?: string;
}

export default function ChatRoom() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("Guest");
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const room_id = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("room_id") : null;

    useEffect(() => {
        if (room_id) {
            const ws = new WebSocket(`/api/rooms/${room_id}/join`);
            ws.onmessage = (event: MessageEvent) => {
                const data: Message = JSON.parse(event.data);
                if (data.username) setUsername(data.username);
                if (data.message) setMessages((prev) => [...prev, data.message]);
            };
            setSocket(ws);
        }
    }, [room_id]);

    const sendMessage = () => {
        if (socket && inputMessage.trim()) {
            socket.send(JSON.stringify({ message: inputMessage }));
            setInputMessage("");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-white-800">Welcome, {username}</h2>
                <button
                    onClick={() => navigator.clipboard.writeText(`/api/rooms/${room_id}/join`)}
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
                        placeholder="Type a message"
                        className="flex-1 p-2 border rounded-md mr-2"
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
