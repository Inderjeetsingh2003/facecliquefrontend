
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
import SubjectHome from './components/SubjectHome';

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
     {
      path:"/subjecthome/:subid?",
      element:<SubjectHome/>
     }   
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
