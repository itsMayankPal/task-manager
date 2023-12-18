const mongoose = require('mongoose')
const {isEmail} = require("validator")
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email :{
        type:String,
        required:[true, "must provide Email Address"],
        trim:true,
        lowerCase:true,
        unique:true,
        validate: [isEmail,"Email should be valid"]
    },
    password :{
        type:String,
        required:[true, "must provide Password"],
        minlength: [6,'password must be at least 6 characters']

    }
})


// fire a function after doc saved to the database 

// userSchema.post('save',function(doc,next){
//     console.log("new user was created and saved",doc)

//     next() // to further send the response
// })

// fire a function before doc is saved to the database 

userSchema.pre('save',async function(next){ // we do not get 

    console.log("function running before saving the file ")
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    
    // console.log("static login function ")

    console.log("user :",user)
    if(user){
        console.log("inside if", user.password)
        const auth = await bcrypt.compare(password,user.password)
        console.log("is auth :", auth)
        if(auth){
            return user
        }

        throw Error("incorrect password")
    }
    console.log("throwing error")
    throw Error("incorrect Email")
}


module.exports = mongoose.model('user',userSchema)


