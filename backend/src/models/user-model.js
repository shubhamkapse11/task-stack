const mongoose  = require("mongoose");
const {Schema , model} = mongoose;

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

module.exports = model('User', userSchema)