const Users = require("../Models/authmodel")

const jwt = require('jsonwebtoken')
// handled all error that i have mentioned in the user Schema table


const handleError = (err)=>{
    // console.log(err.message,err.code)
    let error = {email :'', password :''}


    // incorrect email
  if (err.message === 'incorrect email') {
    error.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    error.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    error.email = 'that email is already registered';
    return error;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      error[properties.path] = properties.message;
    });
  }

   

    return error
}

const createToken = (id) => {
  return jwt.sign({ id }, 'any secrate message honesty is best policy');
};

let signin_get = function(req,res) {
    res.render('login')
}
    
const signup_get = function (req, res) {
    res.render('signup')
}   
    

const signin_post = async function (req, res) {
    
    let {email, password} = req.body
    
    try {
      const user = await Users.login(email, password);
      console.log("user token : ", user);
        const token = createToken(user._id);
        console.log("res token : ", token)
    
        res.cookie('jwt', token, { httpOnly: true});
        console.log("token is saved ")
        res.status(200).json({ user: user._id });
      } 
      catch (err) {
        console.log("error")
        const errors = handleError(err);
        res.status(400).json({ errors });
      }
}   
    
const signup_post = async function (req, res) {
    let {email,password} = req.body
     
    try{
        const user = await Users.create({email,password})
        console.log("account created successfully")
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true});
        res.status(201).json({ user: user._id });
    }catch(err){
       const error =   handleError(err)//called the handle error function at the top of this file
       res.status(400).send({error})
    }
}

const logout_get = (req, res) => {
  res.cookie('jwt', '');
  res.redirect('/');
}

module.exports = {signin_get, signup_post, signup_get,signin_post,logout_get}

