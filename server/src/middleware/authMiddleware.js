import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try{

        const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
        if(!token){
            return res.status(401).json({ message: "No token provided , access denied" });
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


export const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Not allowed." });
    }
    next();
  };
};