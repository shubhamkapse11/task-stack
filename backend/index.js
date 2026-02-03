const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

 const app = express()
app.use(cors());
const port = process.env.PORT ;

app.listen(port ,()=> {
    console.log("app is listing and good to go !" , port)
}  )
 

app.use('/api/v1/user',)