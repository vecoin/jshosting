(function() {
    const WEBHOOK_URL = "https://hook.us1.make.com/7obx2jgtkfdp6i36mx78yamsguub13ah"; // Make.com Webhook URL

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

    // Create chat area
    let chatArea = document.createElement("div");
    chatArea.id = "chatbot-area";
    chatContainer.appendChild(chatArea);

    // Create input field
    let inputField = document.createElement("input");
    inputField.id = "chatbot-input";
    inputField.type = "text";
    inputField.placeholder = "Type a message...";
    chatContainer.appendChild(inputField);

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
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }
        #chatbot-area {
            flex-grow: 1;
            overflow-y: auto;
            padding: 10px;
            border: 1px solid #ccc;
            background: #f9f9f9;
            border-radius: 5px;
        }
        #chatbot-input {
            width: 100%;
            padding: 5px;
            margin-top: 10px;
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
            let message = inputField.value;
            inputField.value = "";

            // Display user message
            let userMessage = document.createElement("div");
            userMessage.textContent = "User: " + message;
            chatArea.appendChild(userMessage);

            // Send message to Make.com Webhook and get response
            let botResponse = await sendToWebhook(message);

            // Display bot response
            let botMessage = document.createElement("div");
            botMessage.textContent = "Bot: " + botResponse;
            chatArea.appendChild(botMessage);
        }
    });

    // Function to send message to Make.com Webhook
    async function sendToWebhook(message) {
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: message })
            });

            const data = await response.json();
            return data.response || "I didn't understand that.";
        } catch (error) {
            console.error("Error sending message:", error);
            return "Error: Unable to connect to chatbot.";
        }
    }
})();
