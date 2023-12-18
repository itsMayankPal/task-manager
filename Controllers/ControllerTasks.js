const asyncWrap = require('../Middleware/async')
const Task  = require('../Models/model')

const getTask = asyncWrap(async(req,res)=>{ 

    const task = await Task.find({})
    console.log(task)
    res.status(200).json({task})
 
})


const setTask = asyncWrap(async(req, res)=>{
    
        const task = await Task.create(req.body)
        console.log("seting task ing the data base ", req.body)
        res.status(201).json({task})
})

const getSpecificTask =asyncWrap(async (req, res)=>{

        const {id:taskId} = req.params
        const task = await Task.findById(taskId)

        if(!task){
            res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({task})
})

const updateTask = asyncWrap(async (req, res)=>{


        const {id :taskId} = req.params

        const task = await Task.findByIdAndUpdate(taskId, req.body,{
            new: true,
            runValidators:true,
            useFindAndModify:false
        })

        if(!task){
            res.status(404).json({message: `Task not found  ${taskId}`})
        }
        res.status(200).json({task})
    } )

const deleteTask = asyncWrap(async (req, res)=>{

    const {id:taskId} = req.params

    console.log(taskId)

    const task = await Task.findByIdAndDelete(taskId)

    if(!task){
        res.status(404).json({message:"task not found"})
    }
    res.status(200).json({task})
   
})

module.exports = {
    getTask,
    setTask,
    getSpecificTask,
    updateTask,
    deleteTask
}