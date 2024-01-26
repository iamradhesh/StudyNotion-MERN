const mongoose = require('mongoose');


require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>console.log("DB connection established........"))
    .catch((error)=>{
        console.log("DB connection error........");
        console.log("Error: " + error);
        process.exit(1);
    })
};

