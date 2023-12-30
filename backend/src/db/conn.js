
const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL;

const connectToDB = async () => {
    try {
        const mongodbInstance = await mongoose.connect(MONGO_URL);
        console.log(`mongodb connected at ${mongodbInstance.connection.host}`)

    } catch (error) {
        console.log("MongoDB connection failed", error)
    }
}

module.exports = connectToDB;