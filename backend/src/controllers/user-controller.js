const mongoose = require('mongoose');
const User = require('../models/user-model')

const userRegister = async (req, res) => {

    const {name, email , password , avatar} = req.body;

    if(!name || !email || !password  ){
        res.status(400).json({
            success:false,
            message:"all feilds are required",
            data:{}
        })
    }
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({
                success:false,
                message:"user already exists",
                data:{}
            })
        }
        const avatarUrl = req.file ? req.file.path : null;
        
        const user = await User.create({
            name,
            email,
            password,
            avatar: avatarUrl
        })
        res.status(201).json({
            success:true,
            message:"user created successfully",
            data:user
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error",
            data:{error:err.message}
        })
    }
}

const logIn = async (req, res) =>{
    const {email , password} = req.body;
    if(!email || !password){
        res.status(400).json({
            success:false,
            message:"all feilds are required",
            data:{}
        })
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found",
                data:{}
            })
        }
        const isMatchPassword = await user.isPasswordMatched(password);
        if(!isMatchPassword){
            return res.status(400).json({
                success:false,
                message:"invalid credentials",
                data:{}
            })
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();
       const options={
        httpOnly: true,
  secure: true,
       }
        res.status(200).cookie("refreshToken", refreshToken,options).cookie("accessToken", accessToken,options ).json({
            success:true,
            message:"login successful",
            data:{
                accessToken,
                   success:false,
            message:"all feilds are required",
                user:{
                    _id:user._id,
                    name:user.name,
                    role:user.role,
            }
        }})
        
}catch(err){
    res.status(500).json({
        success:false,
        message:"internal server error",
        data:{error:err.message}
    })
}
}

const getProfile = async (req , res) => {
    
}

module.exports = {userRegister, logIn}