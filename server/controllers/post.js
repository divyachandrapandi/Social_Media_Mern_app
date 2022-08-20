// LOGIC SIDE
import express from "express";
import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

// --------------GET POSTS --------------------------//
export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// --------------CREATE A POST --------------------------//
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// /------------------------UPDATE POST---------------------------//

export const updatedPost = async (req, res) => {
  const { id: _id } = req.params; //IMPORTANT RENAMING ID AS "_id"
  const post = req.body; // post to be updated submitted through form

  // if not valid mongoose id --> send message when 404 status raise
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  //  above post is a object { title, creator, tags, message, photos} but no ID --> too bad to send a post
  //  without ID, therefore create a constant to create a complete post as below

  const updatedPost = await postMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost); //to send updatedPost as json
};

// -----------------------------------DELETE POST ---------------------------------//

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");

  await postMessage.findByIdAndRemove(id);
  console.log("DELETE");
  res.json({ message: `Successfully deleted Post with ${id}` });
};

//------------------------------------LIKE A POST --------------------------------------//
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    //  ----------------------unathenticated user --------------------------//
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    // index is -1 when no id inside likes
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      // filtering id not equal to userid, then there will be no id hence empty the post.likes
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likedPost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(likedPost);
  } catch (error) {
    console.log(error);
  }
};
