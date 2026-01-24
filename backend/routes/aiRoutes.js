const axios = require('axios')

const imageGenerator = (req, res) => {

    const { prompt } = req.body

    async function query(data) {
        const response = await fetch(
            "https://router.huggingface.co/nscale/v1/images/generations",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );
        const result = await response.blob();
        // console.log('Result =', result);

        return result;
    }


    query({
        response_format: "b64_json",
        prompt: "\"Astronaut riding a horse\"",
        model: "stabilityai/stable-diffusion-xl-base-1.0",
    }).then((response) => {
        // Use image
    });

}


module.exports = {

    imageGenerator,
}