import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
  
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // add user to request object
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
      }
   
};

//role verification 




export default auth;