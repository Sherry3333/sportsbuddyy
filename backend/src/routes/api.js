import express from 'express';
const router = express.Router();

import userRegister from "./register.js"
router.use('/user', userRegister); 

import user from "./user.js"
router.use('/user', user);  // All interfaces need to be authenticated

export default router;