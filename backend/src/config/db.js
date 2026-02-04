const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const mongo_uri = process.env.MONGO_URI;

const DBconnect = async () =>{
    if(!mongo_uri){
        console.log("DB url not found from env")
    }
    try{
           const connecedData = await mongoose.connect(mongo_uri)
         console.log("DB conned success-full" , connecedData.connection.host);
    }catch(err){
        console.log("db connected fail", err.message);
        process.exit(1)
    }
}

module.exports = DBconnect;