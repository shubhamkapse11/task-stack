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

module.exports = {userRegister}