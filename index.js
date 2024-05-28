require("dotenv").config()
const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser")
const passport = require('passport');
require('./config/passport-config')(passport);

const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())

// parse application/json
app.use(bodyParser.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// configuration for cors
const corsOptions = {
    origin: [process.env.FRONTEND_LOCAL_URL, process.env.FRONTEND_URL], 
    credentials: true,
};
app.use(cors(corsOptions))

app.use(passport.initialize());

// match endpoint
app.use('/api', routes)

// 
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`)
});