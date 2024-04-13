
import React ,{useEffect}from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/main'
import {useNavigate} from 'react-router-dom'
import ProfSub from './ProfSub'

export default function ProfHome() {

    const{Professorsubject,getprofessorsub}= useContext(DataContext)
  const navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('prof-token'))
    {
      navigate('/proflogin')
    }
    else{
      getprofessorsub()
    }
  },[])
  return (
    <div className='container my-3'>
  {Professorsubject ?(Professorsubject.map((subject)=>
{
  return <div className='col-md-3 my-4'> 
  <ProfSub subject={subject} />
  </div>

})):(<div>loading...</div>)}

    </div>
)}
