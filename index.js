require("dotenv").config()
const express = require("express")

const userRoute = require("./routes/User");

const app = express();
const PORT = process.env.PORT || 4000;


app.use('/user', userRoute,)

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`)
});