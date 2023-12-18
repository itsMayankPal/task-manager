const jwt = require('jsonwebtoken')
const User = require('../Models/authmodel')

//checking for the jwt token is already exist 
const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token,"any secrate message honesty is best policy",(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}


const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log("check user token :",token)
    if(token){
        jwt.verify(token,'any secrate message honesty is best policy',async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {checkUser, requireAuth}