const dotenv = require("dotenv")
// dotenv.config({ path: './.env.sample' })
dotenv.config({ path: './.env.production' });
const PORT = process.env.PORT || 3000;
const connectToDB = require("./db/conn");
const { app } = require("./app")

connectToDB()
    .then(() => {
        app.on("error", () => {
            console.log("Error ", error);
            throw error
        })
        app.listen(PORT, () => {
            console.log(`Server Listen at ${PORT}`)

        })
    }).catch((err) => {
        console.log("Mongodb connection error", err)
    })
