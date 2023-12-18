const express = require('express')
const app = express()
const tasks = require('./Routers/TasksRoutes')
const authentication = require('./Routers/AuthRoutes')
const connectDb = require("./Database/connect")
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./Middleware/authMiddleware')

require("dotenv").config()

//middleware routes

app.use(express.json())

app.use(express.static('./public'))

app.use(cookieParser())

// view engin
// app.set('view engine', 'ejs');


//task routes
app.use('/api/v1/tasks', tasks)


// auth routes
// app.get('*',checkUser)
// app.get('/',(req,res)=> res.render('home'))
// app.get('/privatepage',requireAuth,async (req,res)=>{
//     res.render('privatepage')
// })
// app.use(authentication)


const port = process.env.PORT||8000

const startServer = async ()=>{

    try{

        await connectDb(process.env.MongoURI)
        console.log("Connect to database")

        
        app.listen(port,()=>{
            console.log("listening on port",port)
        })

    } catch(error){
        console.log(error)
    }


}

startServer()