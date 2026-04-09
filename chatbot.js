// Mock chatbot data
const mockResponses = [
    {
        trigger: ['hello', 'hi', 'hey'],
        response: "Hello! Welcome to Audi. I'm here to help you explore the stunning Audi A6. How can I assist you today?"
    },
    {
        trigger: ['price', 'cost', 'pricing'],
        response: "The Audi A6 starts at $55,900 for the Premium trim. Would you like to know about specific configurations or features?"
    },
    {
        trigger: ['specs', 'specification', 'engine'],
        response: "The Audi A6 features a 2.0L turbocharged engine with 261 HP, Quattro all-wheel drive, and can go 0-60 mph in 5.1 seconds. It's a perfect blend of performance and luxury!"
    },
    {
        trigger: ['features', 'technology'],
        response: "The A6 includes Virtual Cockpit Plus, MMI Navigation, Matrix LED headlights, Bang & Olufsen sound system, and advanced driver assistance features."
    },
    {
        trigger: ['test drive', 'booking', 'schedule'],
        response: "I'd love to help you schedule a test drive! Please contact your nearest Audi dealer or call 1-800-FOR-AUDI to book your experience."
    },
    {
        trigger: ['color', 'colours', 'paint'],
        response: "The Audi A6 is available in Glacier White, Mythos Black, Navarra Blue, Manhattan Gray, and several other stunning colors!"
    },
    {
        trigger: ['interior', 'cabin'],
        response: "The A6's interior features premium leather upholstery, aluminum inlays, ambient lighting, heated seats, and a spacious cabin with cutting-edge technology."
    }
];

const defaultResponse = "That's a great question! I'm a demonstration bot. For detailed information about the Audi A6, please visit your nearest Audi dealership or call 1-800-FOR-AUDI.";

const welcomeMessage = "Welcome to Audi A6 Experience! Ask me about specs, features, pricing, or test drives.";

// Chatbot state
let messages = [];
// DOM elements
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Initialize chatbot
function initChatbot() {
    // Add welcome message
    addMessage('bot', welcomeMessage);

    // Event listeners
    chatButton.addEventListener('click', openChat);
    chatClose.addEventListener('click', closeChat);
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Open chat window
function openChat() {
    chatWindow.classList.add('open');
    chatButton.classList.add('hidden');
    chatInput.focus();
}

// Close chat window
function closeChat() {
    chatWindow.classList.remove('open');
    chatButton.classList.remove('hidden');
}

// Add message to chat
function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;

    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${type}`;
    
    if (type === 'bot') {
        avatar.innerHTML = `
            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">
                <rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect>
                <path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>
            </svg>
        `;
    } else {
        avatar.innerHTML = `
            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">
                <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>
                <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>
            </svg>
        `;
    }

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${type}`;
    bubble.textContent = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    messages.push({ type, text, timestamp: new Date() });
}

// Find response based on user input
function findResponse(userInput) {
    const input = userInput.toLowerCase();
    for (let item of mockResponses) {
        if (item.trigger.some(keyword => input.includes(keyword))) {
            return item.response;
        }
    }
    return defaultResponse;
}

// Send message
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // Add user message
    addMessage('user', text);
    chatInput.value = '';

    // Simulate bot typing delay
    setTimeout(() => {
        const response = findResponse(text);
        addMessage('bot', response);
    }, 800);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initChatbot);