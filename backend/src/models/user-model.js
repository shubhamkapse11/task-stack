const mongoose  = require("mongoose");
const {Schema , model} = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema =  new Schema({
  name : { 
    type : String ,
    required : true
  } ,
  email :{
    type:String,
    required:true
  },
  avatar:{
    type: String,
    required: false,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  },
  password:{
    type:String,
    required:true
  },
  refreshToken:{
    type:String
  }

},{
    timestamps:true
}
)

userSchema.pre('save' ,async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword , this.password)
}

userSchema.methods.generateAccessToken = function(){
  const accessToken = jwt.sign( 
    {_id:this._id , role:this.role , name:this.name , email:this.email},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
  );
  return accessToken;
}

userSchema.methods.generateRefreshToken = function(){
  const refreshToken = jwt.sign( 
    {_id:this._id , role:this.role , name:this.name , email:this.email},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  );
  return refreshToken;
}


module.exports = model('User', userSchema)