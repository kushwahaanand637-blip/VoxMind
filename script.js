// Key ko Vercel Environment Variables ya direct string se access karein
const GEMINI_API_KEY = window.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";

async function askVoxMind() {
  const inputField = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');
  const question = inputField.value.trim();

  if (!question) return;

  // 1. User Message Screen Par Dikhein
  const userDiv = document.createElement('div');
  userDiv.className = 'message user-message';
  userDiv.innerText = question;
  chatBox.appendChild(userDiv);

  // Input Box Clear Karein
  inputField.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // 2. Loading State Dikhein
  const aiDiv = document.createElement('div');
  aiDiv.className = 'message ai-message';
  aiDiv.innerText = "Soch raha hoon...";
  chatBox.appendChild(aiDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // 3. Gemini API Call
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
      aiDiv.innerText = data.candidates[0].content.parts[0].text;
    } else {
      aiDiv.innerText = "Kucch galti ho gayi. Kripya API Key check karein ya thodi der baad try karein.";
    }
  } catch (error) {
    aiDiv.innerText = "Network Error! Request fail ho gayi.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
