import express from "express";

const app = express();
const PORT = process.env.port || 5000;

app.get("/", (req, res) => {
    res.send("Welcome Server");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
