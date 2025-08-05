const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_TOKEN || 'your_super_secret_jwt_token_key_here_please_change_in_production';

function authGuard(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success: false,message:"Authorization token is missing!"});
    } 
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({success: false, message:'Invalid or expired token!'});
    }
}

function adminCheck(req,res,next){
    if(!req.user || req.user.role !== "admin"){
        return res.status(403).json({success:false,message:"Access denied! Admin privileges required."});
    }
    next();
}

module.exports = {
    adminCheck,
    authGuard
}