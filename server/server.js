import express from 'express';
import cors from 'cors';
var cookieParser = require('cookie-parser')
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
import csrf from 'csurf';
const morgan = require('morgan')
require("dotenv").config();

const csrfProtection = csrf({ cookie: true })

//create express app
const app = express();

// apply middelwares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

// connect db 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => console.log('**** DB CONNECTED ****'))
    .catch((err) => console.log('DB connection ERR =>', err))

//route 
// autoload router
readdirSync('./routes').map((r) => {
    console.log(r)
    app.use('/api', require(`./routes/${r}`))
})

//csrf 
app.use(csrfProtection)
app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken()})
})

//port 
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})