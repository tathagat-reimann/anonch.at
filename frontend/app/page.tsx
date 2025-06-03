"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_ANONCHAT_BACKEND_API_BASE_URL || "http://localhost:8080";

export default function Home() {
  const router = useRouter();

  const createChatRoom = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/rooms`, { method: "POST" });
      const data = await response.json();

      if (response.status === 201) {
        router.push(`/chatroom?room_id=${data.room_id}`);
      } else {
        // throw error if the response is not 201
        throw new Error("Server response not 201.");
      }
    } catch (error){
      let errorMessage = "Failed to create chat room. Please try again later.";
      toast.error(errorMessage);
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="text-gray-400 bg-gray-900 body-font rounded-md">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5">
              Do you want to chat with someone anonymously? Chat that is not logged?
            </h2>
            <div className="md:w-3/5 md:pl-6">
              <p className="leading-relaxed text-base">
                Click the button to create a new chat room. Once the room is created, the link to the room can be shared with someone to chat anonymously with them.
              </p>
              <div className="flex md:mt-4 mt-6">
                <button
                  onClick={createChatRoom}
                  className="inline-flex text-white bg-orange-500 border-0 py-1 px-4 focus:outline-none hover:bg-orange-600 rounded"
                >
                  Create chat room
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
