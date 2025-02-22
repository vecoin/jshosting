(function() {
    const WEBHOOK_URL = "https://hook.us1.make.com/7obx2jgtkfdp6i36mx78yamsguub13ah"; // Make.com Webhook URL
    const CHATBOT_NAME = "Blickbot Assitant";  // <-- Change Chatbot Name Here
    const AVATAR_URL = "https://luciano234.github.io/jshosting/logo_v3_blickbot.jpg";  // <-- Change Avatar URL Here

    // Create chat bubble
    let chatBubble = document.createElement("div");
    chatBubble.id = "chatbot-bubble";
    chatBubble.innerHTML = "💬";
    document.body.appendChild(chatBubble);

    // Create chatbot container (hidden by default)
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

    // Create input field (fixed at bottom)
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
            bottom: 80px;
            right: 20px;
            width: 300px;
            height: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            display: none;
            padding: 10px;
            overflow: hidden;
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
            border-radius: 5px;
        }
        #chatbot-input-wrapper {
            padding: 10px;
            background: white;
            border-top: 1px solid #ddd;
        }
        #chatbot-input {
            width: 100%;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);

    // Toggle chatbot visibility when clicking the bubble
    chatBubble.addEventListener("click", function() {
        chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
    });

    // Handle user input
    inputField.addEventListener("keypress", async function(event) {
        if (event.key === "Enter") {
            let message = inputField.value.trim();
            if (!message) return;
            inputField.value = "";

            // Display user message
            let userMessage = document.createElement("div");
            userMessage.textContent = "User: " + message;
            chatArea.appendChild(userMessage);
            chatArea.scrollTop = chatArea.scrollHeight;

            // Send message to Make.com Webhook and get response
            let botResponse = await sendToWebhook(message);

            // Display bot response
            let botMessage = document.createElement("div");
            botMessage.textContent = CHATBOT_NAME + ": " + botResponse;
            chatArea.appendChild(botMessage);
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    });

    // Function to send message to Make.com Webhook
    async function sendToWebhook(message) {
        console.log("Sending message to webhook:", message); // Debugging log

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: message })
            });

            console.log("HTTP Status:", response.status); // Log status code

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Webhook Full Response:", data); // Debugging log

            // Check if webhook response contains "response" field
            if (data && data.response) {
                return data.response;
            } else {
                return "Error: Webhook did not return a valid response.";
            }
        } catch (error) {
            console.error("Error sending message:", error);
            return "Error: Unable to connect to chatbot.";
        }
    }
})();
