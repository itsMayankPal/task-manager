const express = require('express');

const {getTask,setTask,getSpecificTask,updateTask,deleteTask} = require('../Controllers/ControllerTasks')

const router = express.Router();


router.route("/").get(getTask).post(setTask);

router.route('/:id').get(getSpecificTask).patch(updateTask).delete(deleteTask);

module.exports = router;