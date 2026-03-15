const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Health check / welcome route
app.get('/', (req, res) => {
    res.json({ status: "alive", service: "Cingo Compiler Backend" });
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
