const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey) {
    console.log(`✅ Gemini API Key detected (Length: ${apiKey.length})`);
} else {
    console.warn("⚠️ Warning: GEMINI_API_KEY not found in environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Health check / welcome route
app.get('/', (req, res) => {
    res.json({ status: "alive", service: "Cingo Compiler Backend" });
});

// AI Tutor Endpoint
app.post('/tutor', async (req, res) => {
    const { message, history } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
        return res.json({ 
            response: "Gemini API key is missing on the server. Please add it to your environment variables." 
        });
    }

    try {
        const chat = model.startChat({
            history: history || [],
            generationConfig: { maxOutputTokens: 500 },
        });

        const systemPrompt = "You are Cingo AI, an expert C programming tutor for the KTU S2 syllabus. Be encouraging, concise, and provide clear code examples when asked. Only answer questions related to C programming and computer science basics. If asked about other topics, politely redirect to C programming.";
        
        const result = await chat.sendMessage(systemPrompt + "\n\nUser: " + message);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Ai Tutor is temporarily unavailable." });
    }
});

// Mimicking Piston API Payload Structure
app.post('/execute', (req, res) => {
    let code = "";
    if (req.body.files && req.body.files.length > 0) {
        code = req.body.files[0].content;
    } else {
        return res.status(400).json({ message: "No source code provided" });
    }

    const fileId = Date.now().toString() + Math.random().toString(36).substring(2, 8);
    const sourcePath = path.join(tempDir, `${fileId}.c`);
    const outPath = path.join(tempDir, `${fileId}.exe`);

    fs.writeFileSync(sourcePath, code);

    // 1. Compile Code using system GCC with -O0 for maximum speed in simple scripts
    exec(`gcc -O0 "${sourcePath}" -o "${outPath}"`, (compileErr, compileStdout, compileStderr) => {
        if (compileErr) {
            try { fs.unlinkSync(sourcePath); } catch (e) {}
            return res.status(200).json({
               compile: { stderr: compileStderr || compileErr.message }
            });
        }

        // 2. Run the compiled executable securely with a 4-second timeout
        exec(`"${outPath}"`, { timeout: 4000 }, (runErr, runStdout, runStderr) => {
            // 3. Cleanup temp files immediately after run
            try { fs.unlinkSync(sourcePath); } catch (e) {}
            try { fs.unlinkSync(outPath); } catch (e) {}

            return res.status(200).json({
                run: { 
                   stdout: runStdout, 
                   stderr: runStderr || (runErr ? runErr.message : "") 
                }
            });
        });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Cingo Compiler Backend running on port ${PORT}`));
