import React, { useState } from "react";
import { Pencil } from "lucide-react";
import atlaspixel from "../assets/atlaspixel.png";

const Messaging = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    {
      id: 2,
      text: "Hi there! I have a question about implementing a new feature in our application that requires careful consideration of user experience and performance optimizations.",
      sender: "user",
    },
    {
      id: 3,
      text: "I understand your concern about balancing user experience with performance. Could you tell me more about the specific requirements and constraints you're working with?",
      sender: "bot",
    },
    {
      id: 4,
      text: "Well, we need to process large amounts of data in real-time while maintaining a smooth and responsive interface for our users. The main challenge is handling complex calculations without causing any noticeable lag or disruption to the user experience.",
      sender: "user",
    },
    {
      id: 5,
      text: "That's a complex challenge that requires a multi-faceted approach. We could consider implementing web workers for background processing, chunking the data into manageable portions, and using virtualization for rendering large datasets.",
      sender: "bot",
    },
    {
      id: 6,
      text: "That sounds promising! How would we implement the web workers without affecting the main thread?",
      sender: "user",
    },
    {
      id: 7,
      text: "Web workers run in a separate thread, so they're perfect for heavy computations. We can set up a worker to handle the data processing while keeping the UI responsive. Would you like to see some example code for that?",
      sender: "bot",
    },
    {
      id: 8,
      text: "Yes, that would be very helpful! Could you also explain how we'd handle the communication between the worker and the main thread?",
      sender: "user",
    },
    {
      id: 9,
      text: "Of course! Web workers communicate through a messaging system. The main thread sends data using postMessage(), and the worker listens for these messages with onmessage. The worker can then send results back the same way.",
      sender: "bot",
    },
    {
      id: 10,
      text: "That makes sense. What about error handling and fallback strategies?",
      sender: "user",
    },
    {
      id: 11,
      text: "Good question! We should implement try-catch blocks in both the main thread and worker. If the worker fails, we can fall back to a lighter processing method or chunk the data into smaller batches.",
      sender: "bot",
    },
    { id: 12, text: "What about browser compatibility? Do we need any polyfills?", sender: "user" },
    {
      id: 13,
      text: "Web Workers have excellent browser support these days. They work in all modern browsers without polyfills. However, we should still implement feature detection for older browsers.",
      sender: "bot",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: newMessage,
        sender: "user",
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <img
        src={atlaspixel}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Using flex to create a responsive layout */}
      <div className="absolute inset-0 flex justify-end">
        {/* Chat container - fixed width but positioned relative to padding */}
        <div className="w-[32%] bg-transparent flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-scroll no-scrollbar flex flex-col-reverse space-y-reverse space-y-8 ">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } w-full`}
              >
                <div
                  className={`max-w-xl break-words ${
                    message.sender === "user"
                      ? "bg-transparent border-b border-r border-black/20 rounded-l-lg rounded-r-lg rounded-tr-lg"
                      : "bg-transparent border-b border-l border-black/20 rounded-r-lg rounded-tl-lg rounded-l-lg font-bold"
                  } p-3 font-serif text-black`}
                  style={{
                    fontFamily:
                      message.sender === "user"
                        ? "'Architects Daughter', cursive"
                        : "'Coming Soon', cursive",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-transparent">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                maxLength={150}
                className="flex-1 p-2 border-b border-black/20 focus:outline-none focus:border-b-black bg-transparent text-black placeholder-black/50"
                style={{ fontFamily: "'Architects Daughter', cursive" }}
              />
              <button
                type="submit"
                className="p-2 border border-black/20 text-black rounded-lg hover:bg-black/5 focus:outline-none bg-transparent"
              >
                <Pencil size={20} />
              </button>
            </div>
          </form>
        </div>
        {/* Right padding container - takes up 10% of viewport */}
        <div className="w-[5%]" />
      </div>
    </div>
  );
};

export default Messaging;
