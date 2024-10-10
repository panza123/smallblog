import express from 'express';
import { logout, profile, signIn, signUp } from '../controller/auth.controller.js';


const router =express.Router()


router.post('/signup',signUp)
router.post('/login',signIn)
router.get('/profile',profile)
router.post('/logout',logout)


export default router