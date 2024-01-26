import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/auth/OpenRoute"

import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard"
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Error from "./Pages/Error"
import Contact from "./Pages/Contact";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/instructorDashboard/instructor";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state)=>state.profile);
  
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      
      <Navbar />
      
      {/*Creating Routes*/}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
              path="login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />
        <Route 

          path="forgot-password"

          element={
            <OpenRoute>
                  <ForgotPassword />
            </OpenRoute>
          }
        
        
        />
        <Route 

          path="update-password/:id"

          element={
            <OpenRoute>
                  <UpdatePassword />
            </OpenRoute>
          }
        
        />
         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route 
          path="about"
          element={
            
              <About />
           
          }
          
        /> 
        <Route path="/contact" element={<Contact />} />
        
        <Route 
          
        element={
          <PrivateRoute >
              <Dashboard />
          </PrivateRoute>
        }
        >
          <Route 
            path="dashboard/my-profile"
            element={<MyProfile />}
          />
          <Route 
            path="dashboard/instructor"
            element={<Instructor />}
          />
          <Route 
            path="dashboard/settings"
            element={<Settings/>}
          />
          
          
          {
            user?.accountType===ACCOUNT_TYPE.STUDENT && (
              <>  
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />}/>
                  <Route 
                    path="dashboard/cart"
                    element={<Cart/>}
                  />
              </>
            )
          }
          {
            user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/my-courses" 
                  element={<MyCourses />}
                />
                <Route path="dashboard/add-course" element={<AddCourse />}/>

                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }
        </Route>
        <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>

         
       <Route path="*" element={<Error />} />
    </Routes>
      

   </div>
  );
}

export default App;
