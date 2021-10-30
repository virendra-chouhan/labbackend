const express = require('express');
const router = express.Router();
const auth = require('./authenticate/auth')
const adminController = require('./controllers/adminController');
const invetryController = require('./controllers/inventryController/inventryController');
const userController =require('./controllers/userController');


router.use('/admin',adminController);
router.use('/user',auth,userController);
router.use('/',auth,invetryController);











module.exports = router;