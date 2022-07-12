express = require('express');
const Post = require('../models/Post');
router = express.Router();

router.get("/posts", async(request,response)=>{
    try{
        posts = await Post.find();
        response.send(posts);
        console.log("Data accessed");
    }
    catch(err){
        console.log("error While accessing data");
    }
});

router.post("/posts", async (request, response)=>{
    post = new Post({
        title: request.body.title,
        content: request.body.content,
    })
    try{
        await post.save();
        response.send(post);
        console.log("Data inserted successfully");
    }
    catch(err){
        console.log("error while inserting data");
    }
});

router.get("/posts/:id", async (request, response)=>{
    try{
    post = await Post.findOne({_id: request.params.id})
    response.send(post);
    }
    catch{
        response.status(404);
        response.send({error : "Post doesn't exist!"});
    }
});

router.patch("/posts/:id", async(request, response)=>{
    try{
        post = await Post.findOne({_id:request.params.id});

        if(request.body.title){
            post.title = request.body.title;
        }
        if(request.body.content){
            post.content = request.body.content;
        }

        await post.save();
        response.send(post);
        console.log("Post Updated");
    }
    catch{
        response.status(404)
        response.send({error: "Post doesnt exist!"});
    }
});

router.delete("/posts/:id", async(request, response)=>{
    try{
        await Post.deleteOne({_id: request.params.id})
        response.status(204).send()
    }
    catch{
        response.status(404)
        response.send({error: "Post doesnt exist!"});
    }
})

module.exports = router;