import express from 'express'
import { register,login } from '../controllers/user.js';

const router=express.Router();

//user routes
//@api dsc_user register
//@api method-post
//@api endpoint - /api/user/register

router.post('/register',register)

//user Login
//@api dsc - user register
// @api method-post
//@api endpoint - /api/user/login

router.post('/login',login)

export default router
