import express from "express"
import cors from "cors"
import "./config/config.js"
import "./prisma/prisma.js"
import "./config/transporter.js"

import routes from './api/routes/index.js'; 
import logging from './api/middlewares/logging.js';
import { SERVER_PORT } from "./config/config.js";
import path from 'path';
import { fileURLToPath } from 'url';

// create app and connect to db
const app = express()
app.use(cors())

// static
app.use(express.static("./public"));

// middleware
app.use(express.json());
app.use(logging);

// routes
app.use('/api/', routes); 

// run server
app.listen(SERVER_PORT, () => {
    console.log(`Running at ${SERVER_PORT}`)
})
