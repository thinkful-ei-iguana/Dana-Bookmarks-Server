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
    const index = bookmarks.getIndex(
      bookmark => bookmark.id === id
    );
  })
  .delete((req, res) => {});

module.exports = bookmarkRouter;
