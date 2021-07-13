const express = require('express');
const cors = require('cors');
const bookmarksController = require("./controllers/bookmarkController")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/bookmarks", bookmarksController);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Bookmarks App!");
});

app.get("*", (req, res) => {
    res.status(404).send("Sorry, no bookmark found");
});

module.exports = app;