const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function findWorkingModel() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // Based on previous research, these are potential variations
  const candidates = [
    "gemini-1.5-flash",
    "gemini-flash-latest",
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp"
  ];
  
  console.log("Starting model search...");

  for (const m of candidates) {
    try {
      process.stdout.write(`Testing ${m}... `);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Say 'Ready'");
      console.log(`✅ SUCCESS! Responded: ${result.response.text().trim()}`);
      return m; // Found one!
    } catch (error) {
      if (error.message.includes("404")) {
        console.log(`❌ 404 Not Found`);
      } else if (error.message.includes("429")) {
        console.log(`❌ 429 Quota Exceeded`);
      } else {
        console.log(`❌ Error: ${error.message.substring(0, 50)}...`);
      }
    }
  }
  console.log("No working model found in candidates.");
  return null;
}

findWorkingModel();
