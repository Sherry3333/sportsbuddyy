import express from 'express';
const router = express.Router();

import user from "./user.js"
router.use('/user', user);  // All interfaces need to be authenticated

export default router;