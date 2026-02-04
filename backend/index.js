const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBconnect = require('./src/config/db');
dotenv.config()

DBconnect();
const app = express()
app.use(cors({
    origin:'*'
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const port = process.env.PORT ;

app.listen(port ,()=> {
    console.log("app is listing and good to go !" , port)
}  )
 

const user = require('./src/routes/user-routes')

app.use('/api/user',user)