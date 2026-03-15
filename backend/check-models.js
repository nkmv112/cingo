const https = require('https');
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                const names = json.models.map(m => m.name);
                console.log("FULL MODEL LIST:");
                names.forEach(name => console.log(name));
                
                const flash15 = names.find(n => n.includes('gemini-1.5-flash'));
                console.log("\nSEARCH RESULTS:");
                console.log("Is gemini-1.5-flash exactly there?", names.includes('models/gemini-1.5-flash'));
                console.log("Similar flash models:", names.filter(n => n.includes('flash')));
            } else {
                console.log("ERROR:", json);
            }
        } catch (e) {
            console.error("PARSE ERROR:", e.message);
        }
    });
});
