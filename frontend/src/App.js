
import './App.css';
import LandingPage from './components/LandingPage';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import TeacherLogin from './components/TeacherLogin';
import TeacherSignup from './components/TeacherSignup';
import ProfHome from './components/ProfHome';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import StudentSub from './components/StudentSub';
<<<<<<< HEAD
import SubjectHome from './components/SubjectHome';
=======
import ProfSub from './components/ProfSub';
>>>>>>> d3200f01d5d6c3e5708f4affc571d50237c5f135

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<LandingPage/>

    },
    {
      path:'/proflogin',
      element:<TeacherLogin/>
    },
    {
      path:'/profhome',
      element:<ProfHome/>
    },
    {
      path:'/studentlogin',
      element:<StudentLogin/>
    },
    {
      path:'/studenthome',
      element:<StudentHome/>
    },
    {
      path:'/studentsub',
      element:<StudentSub/>
        },
<<<<<<< HEAD
     {
      path:"/subjecthome/:subid?",
      element:<SubjectHome/>
     }   
=======
        {
          path:'/professorsub',
          element:<ProfSub/>
            }
>>>>>>> d3200f01d5d6c3e5708f4affc571d50237c5f135
  ])

  return (
 <>

  {/*<TeacherSignup/> */}
 {/* <StudentSignup/> */}
  {/*<TeacherLogin/>*/}
 {/*<StudentLogin/>*/}
<RouterProvider router={router}/>
 
 </>
  );
}

export default App;
