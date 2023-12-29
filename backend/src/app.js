const express = require("express");
const app = express();
const cors = require("cors")

// configure cors middleware
app.use(cors({
    origin: ["https://lokeshwar-marksheet.onrender.com", "https://lokeshwar-marksheet.netlify.app"],
    // origin: "*",
    credentials: true,
}));

const pdfOperationRoutes = require("./router/pdfOperation.router")

// Initialize Routing end-points
app.use('/api/v1/pdf', pdfOperationRoutes);

module.exports = { app }


