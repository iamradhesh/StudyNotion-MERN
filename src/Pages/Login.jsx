import React from 'react'
import loginImg from "../assets/Images/login.webp"
import Template from '../components/core/auth/Template'
import loginImg2 from "../assets/Images/Instructor.png"
const Login = () => {
  return (
    <Template
    title="Welcome Back"
    description1="Build skills for today, tomorrow, and beyond."
    description2="Education to future-proof your career."
    img1={loginImg}
    img2={loginImg2}
    formType="login"
  />
  )
}

export default Login
