import express from 'express';
const router = express.Router();

import user from "./user.js"
router.use('/user', user);  

import team from "./team.js"
router.use('/team', team);

export default router;