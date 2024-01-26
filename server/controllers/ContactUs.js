const { response } = require("express");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {contactUsEmail} = require("../mail/templates/contactFormRes");
require("dotenv").config();

exports.contactUs = async(req,res)=>{

    try{
            const {email, firstname, lastname, message, phoneNo, countrycode}= req.body;
            //const userId = req.user.id;
            if(!email || !firstname || !lastname || !message || !phoneNo || !countrycode){
                return res.status(400).json({
                    success:false,
                    message:"all Details are required"
                });
            }

           
            //Send mail to use account
            const emailRes = await mailSender(
                email,
                "Your Data send successfully",
                contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
              )

              //extract data for this User

            //     const userData = await User.findOne({email}).populate("courses").populate("additionalDetails").exec() 
            //     || await User.findById({_id:userId}).populate("courses").populate("additionalDetails").exec();

            //     console.log(userData);
            
            //   if(userData)
            //   {
            //     //sent mail to the Admin Account
            //     mailSender(process.env.MAIL_USER,userData);
            //   }

            //sent mail to the Admin Account
               mailSender(process.env.MAIL_USER,`Message from ${email}`,message);
              console.log("Email Res ", emailRes)
              return res.json({
                success: true,
                message: "Email send successfully",
              })
            

          

    }
    catch(error){

        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
        success: false,
        message: "Something went wrong...",
        })
    }
}

 