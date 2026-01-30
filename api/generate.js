// This is a Vercel serverless function

module.exports = async (req, res) => {
    // Enable CORS (Cross-Origin Resource Sharing)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the prompt from the request body
    const { prompt } = req.body;
    console.log('Generating image for prompt:', prompt);

    // Validate that prompt exists
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Hugging Face API URL
        const API_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell";

        // Make request to Hugging Face
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        });

        // Check if the response is not OK
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorMessage;

            if (contentType && contentType.includes("application/json")) {
                const errorJson = await response.json();
                errorMessage = errorJson.error || JSON.stringify(errorJson);
            } else {
                errorMessage = await response.text();
            }

            console.error("HF API Error:", errorMessage);
            return res.status(response.status).json({ error: errorMessage });
        }

        // Process the binary image data
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        // Send back the data URI
        res.json({ image: `data:image/png;base64,${base64Image}` });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal server error during generation" });
    }
};