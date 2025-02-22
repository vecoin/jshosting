(function() {
    const WEBHOOK_URL = "https://hook.us1.make.com/7obx2jgtkfdp6i36mx78yamsguub13ah"; 
    const CHATBOT_NAME = "My AI Assistant";  
    const AVATAR_URL = "https://example.com/avatar.png";  

    // Create chat bubble
    let chatBubble = document.createElement("div");
    chatBubble.id = "chatbot-bubble";
    chatBubble.innerHTML = "💬";
    document.body.appendChild(chatBubble);

    // Create chatbot container
    let chatContainer = document.createElement("div");
    chatContainer.id = "chatbot-container";
    chatContainer.style.display = "none";
    document.body.appendChild(chatContainer);

    // Create chatbot header
    let chatHeader = document.createElement("div");
    chatHeader.id = "chatbot-header";
    chatHeader.innerHTML = `
        <img src="${AVATAR_URL}" id="chatbot-avatar">
        <span>${CHATBOT_NAME}</span>
    `;
    chatContainer.appendChild(chatHeader);

    // Create chat area
    let chatArea = document.createElement("div");
    chatArea.id = "chatbot-area";
    chatContainer.appendChild(chatArea);

    // Create input wrapper (fixed at bottom)
    let inputWrapper = document.createElement("div");
    inputWrapper.id = "chatbot-input-wrapper";
    
    let inputField = document.createElement("input");
    inputField.id = "chatbot-input";
    inputField.type = "text";
    inputField.placeholder = "Type a message...";
    
    inputWrapper.appendChild(inputField);
    chatContainer.appendChild(inputWrapper);

    // Apply styles
    let style = document.createElement("style");
    style.innerHTML = `
        #chatbot-bubble {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: blue;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        #chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            height: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
        }
        #chatbot-header {
            display: flex;
            align-items: center;
            padding: 10px;
            background: #0078ff;
            color: white;
            font-weight: bold;
            font-size: 16px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        #chatbot-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        #chatbot-area {
            flex-grow: 1;
            overflow-y: auto;
            padding: 10px;
            background: #f9f9f9;
        }
        #chatbot-input-wrapper {
            background: white;
            border-top: 1px solid #ddd;
            padding: 10px;
            display: flex;
            position: sticky;
            bottom: 0;
            width: 100%;
            box-sizing: border-box;
        }
        #chatbot-input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);

    // Toggle chatbot visibility when clicking the bubble
    chatBubble.addEventListener("click", function() {
        chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
        inputField.focus();
    });

    // Handle user input
    inputField.addEventListener("keypress", async function(event) {
        if (event.key === "Enter") {
            let message = inputField.value.trim();
            if (!message) return;
            inputField.value = "";

            addMessage("User", message);
            let botResponse = await sendToWebhook(message);
            addMessage(CHATBOT_NAME, botResponse);
        }
    });

    // Function to add messages to chat area
    function addMessage(sender, message) {
        let messageDiv = document.createElement("div");
        messageDiv.className = "chat-message";
        messageDiv.textContent = sender + ": " + message;
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight; 
    }

    // Function to send message to webhook
    async function sendToWebhook(message) {
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: message })
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            return data.response || "No response from bot.";
        } catch (error) {
            console.error("Error:", error);
            return "Error: Unable to connect.";
        }
    }
})();
