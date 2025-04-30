import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res.unauthorized("No token, authorization denied");

  try {
    // verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // add user to request object
    next();
  } catch (error) {
    res.unauthorized("Invalid token");
  }

};

//role verification 




export default auth;