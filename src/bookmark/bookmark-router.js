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
  .delete((req, res) => {
    const { id } = req.params;
    const index = bookmarks.findIndex(
      bookmark => bookmark.id === id
    );
    //validate the index existence
    if (index === -1) {
      logger.error(
        `Bookmark wit id ${id} was not found`
      );
      return res
        .status(404)
        .send('Not Found');
    }
    bookmarks.splice(index, 1);
    res.status(204).end();
  });

module.exports = bookmarkRouter;
