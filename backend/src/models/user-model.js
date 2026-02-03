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

userSchema.pre('save' ,async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
})

module.exports = model('User', userSchema)