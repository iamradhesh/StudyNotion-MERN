import React, { useState } from 'react';
import { Chart, PieController, CategoryScale, Legend, Tooltip, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(PieController, CategoryScale, Legend, Tooltip, ArcElement);

// ... rest of the code





const InstructorChart = ({courses}) => {

  const [currChart,setCurrChart] = useState("students");

  //funtion to generate random chart colors

  const getRandomColors = (numColors)=>{
    const colors = [];
    for(let i=0; i<numColors;i++)
    {
        const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)} `;

        colors.push(color);
    }
    return colors;
  }

  //create Data for chart displaying Student Info

  const chartDataForStudents = {

    labels:courses?.map((course)=>course.courseName),
    datasets: [
      {
        data:courses?.map((course)=> course.totalStudentsEnrolled),
        backgroundColor:getRandomColors(courses?.length)
      }
    ]
  }

  //Create Data for Chart for Displaying Income Information

  const chartDataForIncome = {

    labels:courses?.map((course)=>course.courseName),
    datasets:[
      {
        data:courses?.map((course)=>course?.totalAmountGenerated),
        backgroundColor:getRandomColors(courses?.length)
      }
    ]
  }

  //create Chart options

  const options = {

  };

  return (
    <div>
      <p>Visualize</p>
      <div>
          <button
            onClick={()=>setCurrChart("students")}
          >
            Students
          </button>
          <button
            onClick={()=>setCurrChart("income")}
          >
            Income
          </button>
      </div>
      <div>
          <Pie 

            data={currChart==="students" ? chartDataForStudents : chartDataForIncome}
            options={options}
          
          />
      </div>
    </div>
  )
}

export default InstructorChart
