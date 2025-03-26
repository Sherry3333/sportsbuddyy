import express from 'express';
import auth from '../middleware/auth.js';
import User from '../data/UserSchema.js';

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 
    res.json(user);    
  }catch(error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;