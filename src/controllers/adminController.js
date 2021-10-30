require('dotenv').config()
const express = require('express');
const LoginRouter = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// const dotenv = require('dotenv')
// const { model } = require('mongoose');
const ADMIN = require('../models/adminModel');

LoginRouter.post('/login', async (req, res) => {
    console.warn("request come at login controlller");
    // console.log(req.body)
    const userData = await ADMIN.findOne({ userName: req.body.userName });
    if (userData !== null) {

        const match = await bcrypt.compare(req.body.password, userData.password);

        if (match) {
            var token = await jwt.sign({ userName: userData.userName, tid: "kladsfrowiuij4574we98r789sd7f", exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.TOKEN_SECREAT);
            //  const user = userData['name'];
            //  console.log()
            res.status(200).json({ token: token, user: userData.name })
        } else {
            res.status(400).send("invalid cradential")
        }
    } else {

        res.status(404).send("not found");
    }
})







module.exports = LoginRouter;