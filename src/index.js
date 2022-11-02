const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
const db = require("./config/db");
const route = require("./routes");

const PORT = process.env.port || 5000;
const app = express();

app.use(cors());
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
