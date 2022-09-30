const express= require('express');
const router=express.Router();
const UserController= require('../controllers/user.controller')

router.post('/signup', UserController.userCreate);

router.post('/login', UserController.userLogin)

router.delete('/:userId', UserController.userDelete)
module.exports= router;