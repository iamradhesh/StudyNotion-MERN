import React from 'react'
import contactDetails from '../../data/contactDetails'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const ContactDetails = () => {
  return (
    <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 lg: w-[450px] lg: h-[390px] lg: p-[24px]'>
        {
            contactDetails.map((ele,i)=>{
                let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]

                return (
                    <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200' key={i}>
                        <div className='flex flex -row  items-center p-[2px] gap-[3px]'>
                            <Icon />
                            <h1 className="text-lg font-semibold text-richblack-5">
                                {ele.heading}
                            </h1>
                        </div>
                        <p className="font-medium">
                            {ele?.description}
                        </p>
                        <p className="font-semibold">
                            {ele?.details}
                        </p>
                    </div> 
                )
            })
        }
    </div>
  )
}

export default ContactDetails
