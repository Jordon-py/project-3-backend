const express = require('express')


// router object we attach all of our http
// listeners to
const router = express.Router()

const CommentModel = require('../models/comment')


router.get('/', async function(req, res){
    try {

        const comments = await CommentModel.find({})

        // 200 means the request seccessed
        res.status(200).json(comments)
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})

router.get('/:commentId', async function(req, res){
    try {

        const comment = await CommentModel.findById(req.params.commentId)

        // 200 means the request seccessed
        res.status(200).json(comment)
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})


router.put('/:commentId', async function(req, res){
    try {

        const updatedComment = await CommentModel.findByIdAndUpdate(req.params.commentId, req.body, {new: true})

        // 204 means resource is updated
        res.status(200).json(updatedComment)
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})

router.delete('/:commentId', async function(req, res){
    try {

        const deletedcomment = await CommentModel.findByIdAndDelete(req.params.commentId)

        // 204 means resource is updated
        res.status(200).json({message: 'resource was succesfully deleted'})
    } catch(err){
        // 500 means something went wrong on the server
        res.status(500).json({err: err.message})
    } 
})



// endpoint is localost:3000/comments/
router.post('/', async function(req, res){
    console.log(req.body, ' body of the request')
    
    try {

        const createdComment = await CommentModel.create(req.body)

        // 201 means the resource was created
        // since created comment is an object 
        res.status(201).json(createdComment)


    } catch(err){
        res.status(500).json({err: err.message})
    }

})

module.exports = router