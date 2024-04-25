import React from 'react'
import { useNavigate } from 'react-router'
export default function ProfSub(props) {
  const {subject}=props
const navigate=useNavigate()


  const handleclick=()=>{
    const subid=subject.subjectcode
    console.log("this is hanle click of the proffesor home :",subid)
    navigate(`/profsubjecthome/${subid}`)
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
    CLICK TO TAKE ATTANDANCE
  </button>
    </div>
  </div>
        
           </div>
)}
