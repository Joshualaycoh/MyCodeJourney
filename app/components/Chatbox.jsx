import React, { useRef, useState, useEffect } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import run from '@/config/gemini';

const Chatbox = ({ isDarkMode }) => {
  const chatboxRef = useRef(null);
  const messagesContainerRef = useRef(null); // Ref for the messages container
  const [messages, setMessages] = useState([]); // State to store chat history
  const [input, setInput] = useState(''); // State to store input value
  const [loading, setLoading] = useState(false); // State to handle loading

  // Function to toggle chatbox visibility
  const handleToggleClick = () => {
    if (chatboxRef.current) {
      chatboxRef.current.classList.toggle('hidden');
    }
  };

  // Function to handle sending a message
  const onSent = async () => {
    if (input.trim()) {
      // Add user's message to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, isUser: true },
      ]);

      // Clear the input field
      setInput('');

      // Set loading state
      setLoading(true);

      try {
        // Call the API
        const response = await run(input);
        let responseArray = response.split("**");
        let newResponse = "" ;
        for (let i = 0; i < responseArray.length; i++){
             if(i === 0 || i%2 !== 1){
                 newResponse += responseArray[i];
             }else{
                 newResponse += "<b>"+responseArray[i]+"</b>";
             }
        }
        let newResponse2 = newResponse.split("*").join("</br>");

        // Add the API response to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: newResponse2, isUser: false },
        ]);
      } catch (error) {
        // Handle errors
        console.error('Error fetching response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sorry, something went wrong. Please try again.', isUser: false },
        ]);
      } finally {
        // Reset loading state
        setLoading(false);
      }
    }
  };

  // Scroll to the bottom of the messages container when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggleClick}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition duration-300 ${
          isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chatbox */}
      <div
        ref={chatboxRef}
        className={`fixed bottom-20 right-6 w-80 rounded-lg shadow-lg hidden flex flex-col ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
        }`}
        style={{ maxHeight: '65vh' }} // Set maximum height for the chatbox
      >
        {/* Chatbox Header */}
        <div className={`p-4 rounded-t-lg flex items-center gap-3 ${
          isDarkMode ? 'bg-gray-700' : 'bg-blue-500 text-white'
        }`}>
          <div className="relative">
            <Image
              src={assets.user_image}
              alt="User"
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
            {/* Online Status Dot */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-md font-semibold">Powered by Generative-AI</h3>
            <p className="text-sm">Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 p-4 overflow-y-auto" // Enable vertical scrolling
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.isUser ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg text-left  max-w-[80%]  ${
                  message.isUser
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                dangerouslySetInnerHTML={{__html:message.text}}
              >
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <div className="block p-3 rounded-lg bg-gray-200 text-gray-700 max-w-[100px] ">
                Typing<span className="typing-dots"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 p-2 border rounded-lg focus:outline-none ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          />
          <button
            onClick={onSent}
            disabled={loading} // Disable button while loading
            className={`p-2 rounded-lg ${
              isDarkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbox;