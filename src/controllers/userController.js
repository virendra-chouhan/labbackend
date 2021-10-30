require('dotenv').config()
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// const dotenv = require('dotenv')
// const { model } = require('mongoose');
const USER = require('../models/userModel');

userRouter.post('/add_user', async (req, res) => {
    const userData = await USER.findOne({_id:req.body._id});
    
    if (userData !== null) {
        res.status(208).send("user Already reported");
    } else {
       
        const user = new USER(req.body);

        const result = await user.save();

        console.log(result)
        if(result !== null){

            res.status(201).send("ok")
            
        }else{
            res.status(404).send("something problem")


        }
        
        
    }
})

userRouter.get('/all_user',async(req,res)=>{


     const users = await USER.find();

     if(users.length >= 1){

        res.status(200).json(users)
     }else{

        res.status(404).send('no user found')
     }




})

userRouter.post('/delete_user',async(req,res)=>{

  const user = req.body._id
   
  const result = await USER.deleteOne({_id:user})
   
  if(result.n === 1){

      res.status(200).send("user deleted")
  }else{

    res.status(404).send("user not found")
  }



})







module.exports = userRouter;