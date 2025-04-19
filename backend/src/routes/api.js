import express from 'express';
const router = express.Router();

import user from "./user.js"
router.use('/user', user);  

import sport from "./sport.js"
router.use('/sport', sport);

import location from "./location.js"
router.use('/location', location);

import team from "./team.js"
router.use('/team', team);

export default router;