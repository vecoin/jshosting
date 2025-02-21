function startChatbot() {
    console.log("Chatbot initialized...");

    // Function to send messages to Make.com Webhook
    async function sendMessage(message) {
        console.log("User:", message);

        try {
            const response = await fetch("https://hook.us1.make.com/7obx2jgtkfdp6i36mx78yamsguub13ah", {  // Replace with your actual Make.com Webhook URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: message })  // Sending the message as JSON
            });

            const data = await response.json();
            console.log("Make.com Response:", data);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return { sendMessage };
}

const chatbot = startChatbot();
chatbot.sendMessage("Hello, Make.com!");
