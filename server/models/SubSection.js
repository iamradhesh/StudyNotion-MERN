const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({

    title: {
        type:String,

    },

    timeDuration:{
        type: String//is should be number/integer
    },

    description:{
        type:String
    },
    videoUrl:{
        type:String
    }

   


});

module.exports = mongoose.model("subSection",subSectionSchema);