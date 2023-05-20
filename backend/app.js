const express = require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/posts',(req,res,next)=>{
    const post = req.body;
    res.status(201).json({
        messqge: "post added successfully"
    })
});


app.use('/posts' ,(req,res,next)=>{
    const posts = [
        {
            id: "1234" , 
            title: "title1", 
            content: "content1" 
        },
        {
            id: "1235" , 
            title: "title2", 
            content: "content2" 
        }
    ]
    res.status(200).json({
        messqge: 'posts sent successfully',
        posts
    });
});

module.exports =  app;