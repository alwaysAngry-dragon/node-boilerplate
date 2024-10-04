// connect to the database
const mongoose = require('mongoose');
const fs = require('fs');

const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commetModel');

// read the JSON file

DATABASE_URL =
  'mongodb://localhost:27017/mongoose-aggregation';

mongoose
  .connect(DATABASE_URL)
  .then((con) => {
    console.log('Connected to local database');
  })
  .catch((error) => {
    console.log(
      'Error connecting to remote database: '
    );
    console.log(error);
  });
// delete previous data

// add new data
const userData = JSON.parse(
  fs.readFileSync(
    `${__dirname}/users.json`,
    'utf8'
  )
);

const postData = JSON.parse(
  fs.readFileSync(
    `${__dirname}/posts.json`,
    'utf8'
  )
);

const commentData = JSON.parse(
  fs.readFileSync(
    `${__dirname}/comments.json`,
    'utf8'
  )
);

async function deleteCollectionData() {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();
    console.log('deleted');
    process.exit(0);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

async function insertCollectionData() {
  try {
    await User.create(userData);
    await Post.create(postData);
    await Comment.create(commentData);
    console.log('Data Loaded');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

// deleteCollectionData();
insertCollectionData();
