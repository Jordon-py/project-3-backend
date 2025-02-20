const express = require('express')


// router object we attach all of our http
// listeners to
const router = express.Router()

const PostModel = require('../models/post')


router.get('/', async function(req, res){
    try {

        const posts = await PostModel.find({})

        // 200 means the request seccessed
        res.status(200).json(posts)
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})

router.get('/:postId', async function(req, res){
    try {

        const post = await PostModel.findById(req.params.postId)

        // 200 means the request seccessed
        res.status(200).json(post)
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})


router.put('/:postId', async function(req, res){
    try {

        const updatedPost = await PostModel.findByIdAndUpdate(req.params.postId, req.body, {new: true})

        // 204 means resource is updated
        res.status(200).json(updatedPost)
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})

router.delete('/:postId', async function(req, res){
    try {

        const deletedPost = await PostModel.findByIdAndDelete(req.params.postId)

        // 204 means resource is updated
        res.status(200).json({message: 'post was succesfully deleted'})
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})



// endpoint is localost:3000/Posts/
router.post('/', async function(req, res){
    console.log(req.body, ' body of the request')
    
    try {

        const createdPost = await PostModel.create(req.body)

        // 201 means the resource was created
        // since created Post is an object 
        res.status(201).json(createdPost)


    } catch(err){
        res.status(500).json({err: err.message})
    }

})

module.exports = router