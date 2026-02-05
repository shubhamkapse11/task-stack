const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user-model');

const authVerify  = async (req, res , next) =>{

 const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
 if(!token){
    return res.status(401).json({
        success:false,
        message:"unauthorized request"
    })
 }
 try{
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
     console.log("token in auth middleware" , decodedToken);

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if(!user){
        return res.status(401).json({
            success:false,
            message:"invalid refresh token"
        })
    }
    req.user = user;
    next();
 }catch(err){
    return res.status(401).json({
        success:false,
        message:"invalid refresh token",
        error:err.message
    })
 }
}

module.exports = authVerify;