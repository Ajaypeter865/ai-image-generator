
// IMPORT DEPENDENCY
const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 8000


// MIDDLEWARE
const app = express()


app.get('/', (req, res) => {
    return res.send('Hello')
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})