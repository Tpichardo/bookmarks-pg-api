const express = require("express");
const { getAllBookmarks, getBookmark, createBookmark } = require("../queries/bookmarks");

const bookmarks = express.Router();

bookmarks.get("/", async (req, res) => {
    const allBookmarks = await getAllBookmarks();
    res.json(allBookmarks);
});

bookmarks.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const bookmark = await getBookmark(id);
        if (bookmark["id"]) {
            res.json(bookmark);
        } else {
            console.log(`Database error: ${bookmark}`);
            throw `There is no bookmark with id: ${id}`;
        }
    } catch (error) {
        res.status(404).json({ error: "Resource not found.", message: error });
    }
});

bookmarks.post("/", async (req, res) => {
    try {
        const bookmark = await createBookmark(req.body);
        if (bookmark["id"]) {
            res.json(bookmark);
        } else {
            console.log(`Database error: ${bookmark}`);
            throw `Error adding ${req.body} to the database.`;
        }
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = bookmarks;