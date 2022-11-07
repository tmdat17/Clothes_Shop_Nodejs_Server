const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const db = require("./config/db");
const route = require("./routes");

dotenv.config();

const PORT = process.env.PORT || 5555;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome Server");
});

// route init
route(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

db.connect();
