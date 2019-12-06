const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const bookmarks = require('../store');
const bodyParser = express.json();

const bookmarkRouter = express.Router();

bookmarkRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {});

bookmarkRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(
      bookmark => bookmark.id === id
    );
    if (!bookmark) {
      logger.error(
        `Bookmark with id ${id} was not found`
      );
      return res
        .status(404)
        .send('Not found');
    }
    res.status(200).json(bookmark);
  })
  .delete((req, res) => {});

module.exports = bookmarkRouter;
