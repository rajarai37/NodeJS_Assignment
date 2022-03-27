const express = require('express');
const bodyParser = require('body-parser')
const Post = require('../model/post');
const mongoose = require('mongoose');
const router = express.Router()

router.use(bodyParser());
// ============================ FETCH POSTS =====================================
router.get("/posts", async (req, res) => {
    const posts = await Post.find({user:req.user});
    res.status(200).json({
        status: "success",
        posts
    })
})

// ============================ CREATE POSTS =====================================
router.post("/posts", async (req, res) => {
    try {
        const post = await Post.create({
            name: req.body.name,
            body: req.body.body,
            image: req.body.image,
            user: req.user
        })
        return res.status(200).json({
            status: "Post created",
            data: post
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

// ============================ EDIT POSTS =====================================
router.put("/posts/:id", async(req,res) => {
    try{
       const post = await Post.updateOne({_id:req.params.id}, req.body);
       if (post.modifiedCount>0){
            return res.status(200).json({
                status:"Success",
                message:"Post Updated"
            })
       }else{
           return res.status(401).json({
               status:"Failed",
               message:"Not authorized to edit this post"
           })
       }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status:"Failed",
            message:e.message
        })
    }
});
// ============================ DELETE POSTS =====================================
router.delete("/posts/:id", async(req,res) => {
    try{
        const post = await Post.deleteOne({_id:req.params.id});
        if (post.deletedCount>0){
            return res.status(200).json({
                status:"Success",
                message:"Post Deleted"
            })
        }else{
           return res.status(401).json({
               status:"Failed",
               message:"Not authorized to delete this post"
           })
       }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status:"Failed",
            message:e.message
        })
    }
});

module.exports = router