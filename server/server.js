import express from 'express';
import cors from 'cors';

const morgan = require('morgan')
require("dotenv").config();

//create express app

const app = express();

// apply middelwares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//route 
app.get('/', (req, res, next) => {
    res.send('you hit server endpoint')
})

//port 
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})