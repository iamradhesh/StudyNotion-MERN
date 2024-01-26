const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken

exports.resetPasswordToken =  async (req,res)=>{

    try{
            //get Emial from req body

            const email = req.body.email;

            //chek is mail valid

            const user= await User.findOne({email:email});
            if(!user)
            {
                return res.status(400).json({
                    success: false,
                    message: `Your Email is not registered..!!`
                })
            }
            //generate token

            const token = crypto.randomUUID();
            //Update user by adding token and expiration timee
            const updatedDetails = await User.findOneAndUpdate({email:email},
                {
                    token:token,
                    resetPasswordExpires: Date.now()+5*60*1000,
                },{new:true} );
                console.log("Updated details", updatedDetails);
            
            //create URL
            const url = `http://localhost:3000/update-password/${token}`
            
            //send Email containing URL
                await mailSender(email,"Password Reset Link", `Password Reset Link:${url}`)
            //return response

            return res.status(200).json({
                success: true,
                message: "Email Sent Successfully , Please check Email and Change password"
            })
    
        }
    catch(error){
            console.log("Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while resetting your password..!!",
        })
    }
}
//resetPassword

exports.resetPassword = async (req,res) => {

    try{

        //Data Fetch
        const {password,confirmPassword,token} = req.body;
        //validation
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid password.."
            })
        }
        //Get UserDetails from DB using Token

        const userDetails = await User.findOne({token: token});
        //If  no entry found-> Invalid Token/Time Expires
        if(!userDetails)
        {
            return res.status(404).json({
                success: false,
                message: "No entry found..!!, Invalid Token"
            })
        }
        //Check Token Expiry

        if(userDetails.resetPasswordExpires<Date.now())
        {
            return res.status(403).json({
                success: false,
                message: "Token has expired, Please try again later"
            })
        }

        //Hash Password

        const hashedPassword = await bcrypt.hash(password,10);
        //Update Password Entry in DB
        await User.findOneAndUpdate({token:token},
            {password:hashedPassword},
            {new:true}
        )
        //return Response

        return res.status(200).json({
            success: true,
            message: "Password has been updated..!!"
        })
    }
    catch(error){
                console.log("Error: " + error);
                return res.status(500).json({
                    success: false,
                    message: "Oops Something Went wrong Please try again Later..!!"
                })
    }
}
