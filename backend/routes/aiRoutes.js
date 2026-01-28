
const imageGenerator = async (req, res) => {


    const { prompt } = req.body
    console.log('Promt', prompt);

    try {
        const response = await fetch(
            "https://router.huggingface.co/nscale/v1/images/generations",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: prompt,
                    model: "stabilityai/stable-diffusion-xl-base-1.0",
                }),
            }
        );

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64Image = buffer.toString("base64");

        res.json({ image: `data:image/png;base64,${base64Image}` });
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ error: "Image generation failed" });
    }
}






module.exports = {

    imageGenerator,
}