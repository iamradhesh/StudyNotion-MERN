import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore.js"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabsName=[
    
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab,setCurrentTab] = useState(tabsName[0]);

    const [courses,setCourses] = useState(HomePageExplore[0].courses) ;

    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value)=>{
        
        setCurrentTab(value);

        const result = HomePageExplore.filter((course)=>course.tag===value);

        setCourses(result[0].courses);

        setCurrentCard(result[0].courses[0].heading);
    }
  
  
    return (
    <div>
      <div className='text-4xl font-semibold text-center'>
        Unlock the {" "}<HighlightText text={"Power of Code"} />
      </div>

      <p className='text-center text-richblack-300 text-lg font-semibold mt-1 mb-6'>
        Learn to Build Anything You Can Imagine
      </p>

      <div className='hidden lg:flex gap-5 -mt-5 mb-1 mx-auto w-max bg-richblack-800 text-richblack-50 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
        {
            tabsName.map((ele,index)=>{
                return (
                    <div key={index} className={`text-[16px] flex flex-row items-center gap-2
                                    ${currentTab===ele? "bg-richblack-900 text-richblack-5 font-medium"
                                    : "bg-richblack-500"} 
                                    rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900
                                    hover:text-richblack-5 px-7 py-2`} 
                                    onClick={()=>setMyCards(ele)}>
                            {ele}
                    </div>
                )
            })
        }
      </div>

      <div className='hidden lg:block lg:h-[200px]'></div>

     {/* course Card ka group*/}

        <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
            {
                courses.map((element,index)=>{
                    return (
                        <CourseCard key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}/>
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore
