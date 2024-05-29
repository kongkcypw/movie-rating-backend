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
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Access-Control-Allow-Methods',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: ["https://movie-rating-frontend.vercel.app", "http://localhost:5173"],
    credentials: true,
    // preflightContinue: false
};
app.use(cors(corsOptions))

app.use(passport.initialize());

// match endpoint
app.use('/api', routes)

// basic route
app.get('/', function (req, res) {
    res.json({ message: 'Express is working' });
});

// 
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`)
});