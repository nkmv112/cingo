const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // There isn't a direct listModels in the client SDK like this, 
    // but we can try a simple generation with a known model to verify.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    console.log("SUCCESS: gemini-1.5-flash is available.");
  } catch (error) {
    console.error("FAILURE:", error.message);
  }
}

listModels();
