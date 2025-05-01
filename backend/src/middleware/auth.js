import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res.apiUnauthorized("No token, authorization denied");

  try {
    // verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // add user to request object
    next();
  } catch (error) {
    res.apiUnauthorized("Token is not valid");
  }

};

//role verification 




export default auth;