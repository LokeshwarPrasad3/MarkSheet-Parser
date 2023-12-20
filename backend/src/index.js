const express = require("express");
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config({ path: './.env' })
const path = require("path");
const PORT = process.env.PORT || 3000;

// configure cors middleware
app.use(cors({
    origin: "*",
    credentials: true,
}))


const basicRouter = require("./router/basic.router.")

// Initialize Routing end-points
app.use('/api/pdf', basicRouter);


// server port listening
app.listen(PORT, () => {
    console.log(`Server Listen at ${PORT}`)
})


