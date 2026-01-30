// IMPORT DEPENDENCY
const express = require('express')
const PORT = process.env.PORT || 8000
const cors = require('cors')
require('dotenv').config()

// MODULES
const aiRoutes = require('./routes/aiRoutes')


// MIDDLEWARE
const app = express()
app.use(cors())
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
    return res.send('Hello')
})
app.post('/', aiRoutes.imageGenerator)


 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})



module.exports = app