const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app=express();

mongoose.connect("mongodb+srv://makrem:g8sV3ifAipNAzGkV@cluster0.bhkurq3.mongodb.net/max-mean-stack?retryWrites=true&w=majority")
    .then(()=>{
        console.log("connected to database successfully!");
    })
    .catch(()=>{
        console.log("failed to connect to database!");
    })

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
app.post('/posts',(req,res,next)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content

    });
    post.save();
    res.status(201).json({
        messqge: "post added successfully"
    })
});

app.get('/posts' ,(req,res,next)=>{
    Post.find()
        .then(documents => {
            console.log(documents);
            res.status(200).json({
                messqge: 'posts sent successfully',
                posts: documents
            });
        });
    
});

module.exports =  app;