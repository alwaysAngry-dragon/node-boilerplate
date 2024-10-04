const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commetModel');
const mongoose = require('mongoose');

async function matchUser(res) {
  try {
    const result = await Post.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(
            '64f63f1e9b92e21c5b8a1a1a'
          ), // Convert string to ObjectId
        },
      },
    ]);
    return res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      status: 'error',
      error: e,
    });
  }
}

async function postPerUser(res) {
  try {
    const result = await Post.aggregate([
      {
        $group: {
          _id: '$user',
          postCount: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      status: 'error',
      error: e,
    });
  }
}

async function getUserPerPost(res) {
  try {
    const result = await Post.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo',
      },
      {
        $project: {
          title: 1, // Include title
          'userInfo.name': 1, // Include the user’s name
        },
      },
    ]);
    return res.status(200).json({
      status: 'success',
      length: result.length,
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      status: 'error',
      error: e,
    });
  }
}

async function getSkippedComments(res) {
  try {
    const result = await Comment.aggregate([
      {
        $sort: { createdAt: -1 }, // Sort by newest first
      },
      {
        $skip: 5, // Skip the first 5 documents
      },
      {
        $limit: 3, // Limit to the next 3 documents
      },
    ]);
    return res.status(200).json({
      status: 'success',
      length: result.length,
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      status: 'error',
      error: e,
    });
  }
}

async function getUserStats(res) {
  try {
    const result = await User.aggregate([{}]);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: 'Server Error' });
  }
}

exports.getAggregate = async function (
  req,
  res,
  next
) {
  try {
    await getSkippedComments(res);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Server Error' });
  }
};

exports.getAllUsers = async function (
  req,
  res,
  next
) {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error' });
  }
};

exports.getAllPosts = async function (
  req,
  res,
  next
) {
  try {
    const posts = await Post.find({});

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error' });
  }
};

exports.getAllComments = async function (
  req,
  res,
  next
) {
  try {
    const comments = await Comment.find({});

    res.status(200).json({
      status: 'success',
      data: {
        comments,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error' });
  }
};
