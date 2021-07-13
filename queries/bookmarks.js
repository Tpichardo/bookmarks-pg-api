//bring in your connection to the database
const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {
    //db.any() is a function that takes a string as a first argument
    // .any() - means it will accept any return from the database, no rows, one row, or many rows of data.
    try {
        const allBookmarks = await db.any("SELECT * FROM bookmarks");
        return allBookmarks;
    } catch (error) {
        return error;
    }
};

const getBookmark = async (id) => {
    try {
        const oneBookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
        return oneBookmark;
    } catch (error) {
        return error;
    }
};

const createBookmark = async (bookmark) => {
    try {
        if (!bookmark.name) {
            throw 'You must specify a value for "name"';
        }
        const newBookmark = await db.one("INSERT INTO bookmarks (name, url, is_favorite) VALUES($1, $2, $3) RETURNING *", [bookmark.name, bookmark.url, bookmark.is_favorite]);
        return newBookmark
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllBookmarks,
    getBookmark,
    createBookmark
};