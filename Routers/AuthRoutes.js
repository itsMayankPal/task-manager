const express = require('express')



const {signup_post, signup_get ,logout_get,signin_get,signin_post} = require('../Controllers/authController')

const routers = express.Router()


routers.route('/login').get(signin_get).post(signin_post)


routers.route('/register').get(signup_get).post(signup_post)

routers.route('/logout').get(logout_get)

module.exports = routers