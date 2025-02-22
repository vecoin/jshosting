function startChatbot() {
    console.log("Chatbot initialized...");

    // Function to send messages to Make.com Webhook
    async function sendMessage(message) {
        console.log("User:", message);

        try {
            const response = await fetch("https://hook.us1.make.com/7obx2jgtkfdp6i36mx78yamsguub13ah", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: message })
            });

            const data = await response.json();
            console.log("Make.com Response:", data);
            
            // Display response in chatbot iframe
            const chatbotFrame = document.getElementById("chatbot-frame");
            if (chatbotFrame) {
                chatbotFrame.contentWindow.postMessage(data, "*");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    // Attach event listener to chatbot input
    document.addEventListener("DOMContentLoaded", function () {
        const inputField = document.getElementById("chatbot-input");
        if (inputField) {
            inputField.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    sendMessage(inputField.value);
                    inputField.value = ""; // Clear input after sending
                }
            });
        }
    });

    return { sendMessage };
}

const chatbot = startChatbot();
