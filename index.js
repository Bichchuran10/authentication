const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();

app.get('/',(req,res)=>{
    res.json({
        message: "a sample api"
    })
})

app.listen(5000,()=>{
    console.log('app is running on port 5000')
})