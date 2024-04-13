import React ,{useEffect}from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/main'
import {useNavigate} from 'react-router-dom'
import StudentSub from './StudentSub'


export default function StudentHome() {
  
  const{Studentsubject,getstudentsub}= useContext(DataContext)
  const navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('student-token'))
    {
      navigate('/studentlogin')
    }
    else{
      getstudentsub()
    }
  },[])
  
  
  return (
    <div className='container my-3'>
  {Studentsubject ?(Studentsubject.map((subject)=>
{
  return <div className='col-md-3 my-4'> 
  <StudentSub subject={subject} />
  </div>

})):(<div>loading...</div>)}

    </div>
  )
}
