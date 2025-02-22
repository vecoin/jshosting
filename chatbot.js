(function() {
    // Create the chatbot bubble
    let chatBubble = document.createElement("div");
    chatBubble.id = "chatbot-bubble";
    chatBubble.innerHTML = "💬";
    document.body.appendChild(chatBubble);

    // Create the chatbot container (hidden by default)
    let chatContainer = document.createElement("div");
    chatContainer.id = "chatbot-container";
    chatContainer.style.display = "none";
    document.body.appendChild(chatContainer);

    // Create the iframe inside the chatbot container
    let chatIframe = document.createElement("iframe");
    chatIframe.id = "chatbot-frame";
    chatIframe.src = "https://luciano234.github.io/jshosting/chatbot.html";  // Chatbot page
    chatContainer.appendChild(chatIframe);

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
            overflow: hidden;
        }
        #chatbot-frame {
            width: 100%;
            height: 100%;
            border: none;
        }
    `;
    document.head.appendChild(style);

    // Toggle chatbot visibility when clicking the bubble
    chatBubble.addEventListener("click", function() {
        chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
    });
})();
