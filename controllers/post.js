const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const Like = require("../models/Like");
const getPosts = async (request, response) => {
  try {
    const posts = await Post.find()
      .populate({ path: "user", select: "name" })
      .sort([["dateTime", "desc"]]);
    response.json(posts);
  } catch (err) {
    response.json({ message: err });
  }
};

const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    response.json(post);
  } catch (err) {
    response.json({ message: err });
  }
};

const createPost = async (request, response) => {
  const post = new Post({
    description: request.body.description,
    user: request.user._id,
    image: request.body.image,
  });
  try {
    const savedPost = await post.save();
    response.json(savedPost);
  } catch (err) {
    response.json({ message: err });
  }
};

const deletepost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    if (post.user.toString() === request.user._id){
      await Post.findByIdAndRemove(request.params.id)
      return response.status(200).json({message: "Object deleted successfully"})
    }else{
      return response.status(401).json({message:"You're not the post author"})
    }
  } catch (err) {
    response.json({ message: err });
  }
};

const updatePost = async (request, response) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: request.params.id },
      {
        $set: {
          dateTime: request.body.dateTime,
        },
      }
    );
    response.json(updatedPost);
  } catch (err) {
    response.json(err);
  }
};

const likePost = async (request, response) => {
  await Post.findByIdAndUpdate(
    request.params.id,
    {
      $push: { likes : request.user._id },
    },
    {
      new: true,
    }
  ).exec((error, result) => {
    if (error) return response.status(400).json(error);
    response.status(200).json(result);
  });
};

const unlikePost = async (request, response) => {
  await Post.findByIdAndUpdate(
    request.params.id,
    {
      $pull: { likes: request.user._id },
    },
    {
      
      new: true,
    }
  ).exec((error, result) => {
    if(error) return response.status(400).json(error);
    response.status(200).json(result);
  });
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  deletepost,
  updatePost,
  likePost,
  unlikePost,
};
