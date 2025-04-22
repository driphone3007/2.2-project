let chatOpen = false;

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-container');
    chatOpen = !chatOpen;
    chatbot.style.display = chatOpen ? 'block' : 'none';
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    processMessage(message);
    input.value = '';
}

function addMessage(message, sender) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleQuickQuestion(type) {
    const questions = {
        'property-search': "I want to search for properties",
        'schedule-visit': "I need to schedule a property visit",
        'pricing-info': "Can you explain pricing details?"
    };
    addMessage(questions[type], 'user');
    processMessage(questions[type]);
}

function processMessage(message) {
    // Simulate API call
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('property') || lowerMsg.includes('search')) {
        return "What type of property are you looking for? (House/Apartment/Commercial)";
    }
    
    if (lowerMsg.includes('schedule') || lowerMsg.includes('visit')) {
        return "Please provide the property ID and preferred date/time for the visit.";
    }
    
    if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
        return "Our prices range from $200k to $5M depending on property type. Could you specify your budget?";
    }
    
    if (lowerMsg.includes('thank')) {
        return "You're welcome! Let me know if you need anything else.";
    }
    
    return "I'll connect you with a human agent. Please wait...";
}