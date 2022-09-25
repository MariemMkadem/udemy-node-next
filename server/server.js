import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';

const morgan = require('morgan')
require("dotenv").config();

//create express app

const app = express();

// apply middelwares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//route 
// autoload router
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

//port 
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})