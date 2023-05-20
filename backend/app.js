const express = require('express');

const app=express();

app.use((req,res,next)=>{
    console.log('first middleware');
    // next();
})

app.use((req,res,next)=>{
    res.send('hello from the express app');
})

module.exports =  app;