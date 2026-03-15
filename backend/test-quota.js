const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = ["gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-2.0-flash"];
  
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hi");
      console.log(`✅ SUCCESS for ${m}: ${result.response.text().substring(0, 50)}...`);
    } catch (error) {
      console.error(`❌ FAILURE for ${m}: ${error.message}`);
    }
  }
}

testModels();
