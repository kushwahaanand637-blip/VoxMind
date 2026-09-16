const GEMINI_API_KEY = window.GEMINI_API_KEY || "";

async function askVoxMind() {
    const inputField = document.querySelector('input');
    const responseBox = document.querySelector('.response-box');
    const question = inputField.value.trim();

    if (!question) return;

    responseBox.innerText = "Soch raha hoon...";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: question }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            responseBox.innerText = data.candidates[0].content.parts[0].text;
        } else {
            responseBox.innerText = "Kucch galti ho gayi. Kripya API Key check karein.";
        }
    } catch (error) {
        responseBox.innerText = "Error: Server connect nahi ho paya.";
    }
}

document.querySelector('button').addEventListener('click', askVoxMind);
