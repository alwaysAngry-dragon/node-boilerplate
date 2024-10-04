const express = require('express');

const {
  getAggregate,
  getAllUsers,
  getAllPosts,
  getAllComments,
} = require('../controllers/aggreagateController');

const router = express.Router();

router.route('/').get(getAggregate);
router.get('/users', getAllUsers);
router.get('/posts', getAllPosts);
router.get('/comments', getAllComments);

module.exports = router;
