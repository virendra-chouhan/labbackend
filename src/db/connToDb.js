require('dotenv').config()
const mongoose = require('mongoose');

const connnectDB = async()=>{

    const db = await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    
    if(db){
        console.log("connnection succefull to DB .....");
    }
}
connnectDB();