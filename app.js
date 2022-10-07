const express = require('express')
const app = express()
const tasks = require('./Routers/TasksRoutes')

const connectDb = require("./Database/connect")

require("dotenv").config()


//middleware routes

app.use(express.json())
app.use(express.static('./public'))

//routes



app.use('/api/v1/tasks', tasks)

const port = 3000

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