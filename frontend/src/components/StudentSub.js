import React, { useContext } from 'react'
import { DataContext } from '../context/main'
import { useNavigate } from 'react-router'
export default function StudentSub(props) {
  const {subject}=props
const navigate=useNavigate()

  const{setisclicked,isclicked}=useContext(DataContext)
const handleclick=()=>
{

  let subid=subject.subjectcode

  navigate(`/subjecthome/${subid}`)
  localsubject()
  
}
//setting the local storage with the subject name and subject code for marking the attandace of that subject
const localsubject=()=>
{
  localStorage.setItem('subjectname',subject.subjectname)
  localStorage.setItem('subjectcode',subject.subjectcode)
}
  
  return (
    <div>
       <div className="card" style={{"width": "18rem"}}>
  <img src="..." className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title"><b>{subject.subjectname}</b></h5>
    <p className="card-text">this is temp description</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><b>{subject.subjectcode.toUpperCase()}</b></li>
    <li className="list-group-item"><b>{subject.totalhours}hrs</b></li>
    <li className="list-group-item">credits=<b>{subject.credits}</b></li>
  </ul>
  <div className="card-body">
  <button type="button" class="btn btn-primary"
        style={{"--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem"," --bs-btn-font-size": ".75rem;"}} onClick={handleclick}>
  CLICK TO GIVE ATTANDANCE
</button>
  </div>
</div>
      
         </div>
  )
}
