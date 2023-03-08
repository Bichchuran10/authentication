const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const secretKey="secretkey11"

app.get('/',(req,res)=>{
    res.json({
        message: "a sample api"
    })
})

app.post('/login',(req,res)=>{
    //creating a sample user
    const user={
        id:1,
        username:"Bichchuran",
        email:"bchangmaiii@gmail.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })
    })

})
app.post('/profile',verifyToken,(req,res)=>{

    //token verification
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err)
        {
            res.send({result: "invalid token"})
        }
        else
        {
            res.json({ 
                message: 'profile accessed',
                authData
        })
        }
    })


})

//getting the token
//middleware
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader!= 'undefined')
    {
        
        const bearer=bearerHeader.split(" "); //splitting on the basis of space since they have space in between
        console.log(bearer) //the whole array
        const token=bearer[1]
        console.log(bearer[0]) //bearer keyword since it's the first element
        console.log(bearer[1]) //the token
        req.token=token //add the token to request
        next() //once we get the token we send the control to the next here app.post('/profile')

    }
    else
    {
        res.send({
            result:"Token is not found"
        })
    }

}
app.listen(5000,()=>{
    console.log('app is running on port 5000')
})