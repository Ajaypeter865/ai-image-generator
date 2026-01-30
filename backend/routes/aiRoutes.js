

const imageGenerator = async (req, res) => {
    const { prompt } = req.body;
    console.log('Generating image for prompt:', prompt);

    try {
        // NEW ROUTER URL FORMAT
        // const API_URL = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";
        const API_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell";

        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        });

        // 1. Check if the response is NOT OK
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorMessage;

            if (contentType && contentType.includes("application/json")) {
                const errorJson = await response.json();
                errorMessage = errorJson.error || JSON.stringify(errorJson);
            } else {
                errorMessage = await response.text(); // This catches "Not Found" text
            }

            console.error("HF API Error:", errorMessage);
            return res.status(response.status).json({ error: errorMessage });
        }

        // 2. Process the binary image data
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        // 3. Send back the data URI
        res.json({ image: `data:image/png;base64,${base64Image}` });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal server error during generation" });
    }
}

module.exports = { imageGenerator };

