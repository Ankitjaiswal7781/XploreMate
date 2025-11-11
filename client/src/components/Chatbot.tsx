import { useState, useEffect, useRef } from "react";
import { Bot, X, Send, Globe } from "lucide-react";
import Logo from "@/assets/XploreMate.png";
import BotImage from "../assets/bot.png";
import { useThemeStore } from "@/store/useThemeStore";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const fetchBotResponse = async (question: string) => {
    const res = await fetch("http://localhost:8000/api/rag/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    return data.answer;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    const botReplyText = await fetchBotResponse(userMsg.text);
    const botMsg = { text: botReplyText, sender: "bot" };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div ref={chatbotRef} className="fixed bottom-[3rem] right-[2rem] z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`relative w-16 h-16 flex items-center justify-center bg-fuchsia-800 text-white rounded-full 
          transition-transform duration-300 hover:scale-110 shadow-[0_0_15px_6px] shadow-fuchsia-800`}
        >
          <Bot size={36} />
        </button>
      )}

      {isOpen && (
        <div
          className={`w-[90vw] max-w-md h-[65vh] transition-transform duration-300 
          origin-bottom-right transform scale-100 opacity-100 
          ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          } 
          shadow-2xl rounded-lg flex flex-col overflow-hidden border border-gray-300 md:w-[28rem]`}
        >
          <div
            className={`flex items-center justify-between ${
              theme === "dark" ? "bg-gray-500" : "bg-gray-400"
            } text-white p-3`}
          >
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Logo" className="w-28 h-auto" />
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={BotImage}
                    alt="Bot"
                    className="w-12 h-12 rounded-full mr-2"
                  />
                )}
                <div
                  className={`p-3 rounded-lg max-w-[75%] ${
                    msg.sender === "bot"
                      ? theme === "dark"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-black"
                      : theme === "dark"
                      ? "bg-fuchsia-900 text-white"
                      : "bg-fuchsia-800 text-white"
                  }`}
                >
                  <div className="prose whitespace-pre-wrap">
                    <ReactMarkdown>
                      {msg.text.replace(/\n{3,}/g, "\n").trim()}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-sm text-gray-500 px-2 mt-2">
                <img
                  src={BotImage}
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2 animate-pulse"
                />
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            className={`flex items-center border-t p-2 ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <button className="p-2">
              <Globe
                size={24}
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              />
            </button>
            <input
              type="text"
              className={`flex-1 px-3 py-2 text-sm border rounded-lg outline-none ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-600"
                  : "border-gray-300"
              }`}
              placeholder="Type here to chat..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-3 rounded-full bg-fuchsia-900 text-white"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
