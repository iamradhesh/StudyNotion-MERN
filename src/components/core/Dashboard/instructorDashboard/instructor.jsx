import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {fetchInstructorCourses} from '../../../../services/operations/CourseDetailsAPI'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
const Instructor = () => {
    const [loading,setLoading] = useState(false);
    const [instructorData,setInstructorData] = useState(null);
    const [courses,setCourses] = useState([]);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    useEffect(()=>{
        const getCourseDataWithStats = async()=>{

            setLoading(true);

            const instructorAPIData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            
            console.log("instructorAPIData: ", instructorAPIData);

            if(instructorAPIData.length)
            {
                setInstructorData(instructorAPIData);
            }

            if(result)
            {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    },[])


    const totalAmount = instructorData?.reduce((acc,curr)=> acc+curr.totalAmountGenerated,0);

    const totalStudents = instructorData?.reduce((acc,curr)=> acc + curr.totalStudentsEnrolled,0);






  return (
    <div className='text-white'>
       <div>
            <h1>Hi {user.firstName} 👋</h1>
            <p>Let's Start Something New</p>

        </div> 

        {
            loading? (<div className='spinner'></div>) :
            courses.length>0 ? (
                <div>
                    <div>
                        <InstructorChart courses ={instructorData} />
                        <div>
                            <h2>Statistics</h2>
                            <div>
                            <p>Total Courses</p>
                            <p>{courses.length}</p> 
                            </div>
                            <div>
                                <p>Total Students</p>
                                <p>{totalStudents}</p>
                            </div>

                            <div>
                                <p>Total Income</p>
                                <p>{totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Render Courses */}
                        <div>
                            <p>Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p>View All</p>
                            </Link>
                        </div>

                        <div className='flex gap-x-3'>
                            {
                                courses.slice(0,3).map((course,index)=>(
                                    <div key={index} className='flex flex-col' >
                                       <div >
                                        <img 
                                                src={course.thumbnail}
                                                className='h-[200px] w-[200px] '
                                            />
                                       </div>
                                        
                                        <div className='flex'>
                                            <p>{course.courseName}</p>
                                            
                                            <div className='flex'>
                                                { }
                                                <p>
                                                    {
                                                        course.studentsEnrolled.length
                                                    } Students
                                                </p>
                                                <p>|</p>
                                                <p>Rs {course.price}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            ) :
            (<div>
                <h2>Oops..!! YOu have not created any courses Yet </h2>
                <Link to="/dashboard/add-course">
                    <h3>Click here to create a course</h3>
                </Link>
            </div>)
        }
    </div>
  )
}

export default Instructor
