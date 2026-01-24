// IMPORT DEPENDENCY
const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 8000


// MODULES
const aiRoutes = require('./routes/aiRoutes')


// MIDDLEWARE
const app = express()

app.use('/', aiRoutes.imageGenerator)


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})