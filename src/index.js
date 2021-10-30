require('dotenv').config()
var cors = require('cors')
const express = require('express');
require("./db/connToDb")

const app = express()
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json())
const router = require('./Router')
app.use("/api", router);
// app.use(express.Router());
 
app.get("/",(req,res)=>{


  res.send({message:"welcome to SSISM "})

})


 


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})