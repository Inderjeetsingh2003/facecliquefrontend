import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { DataContext } from '../context/main'
import {io} from 'socket.io-client'
import { useMemo } from 'react'
import { useParams } from 'react-router'


export default function ProfSubjectHome() {
  //holding the value of the selected month fo rfiltering the attandance records
  const[selectedmonth,setselectmonth]=useState(new Date().getMonth()+1)
  const{subid}=useParams()
// setting up the socket connection
 const socket=useMemo(() => io('http://localhost:4000/'), [])

 //establishing the conenction with the sever (socket-io-connectionn)
useEffect(() => {
  socket.on("connect",()=>
{
  console.log("socket is connected")
  console.log(socket.id)
})
}, [])


// for enabling the student side attandance button
const[enableattandance,setenableattandance]=useState(false)
const handleclick=async(e)=>
{

 // setenableattandance(true)
 socket.emit('profclick',{professorlatitude,professorlongitude,subid})

}

//getting the professor side attandance for the subject he teaches
const{getprofattandance,professorsideattandace,getlocation}=useContext(DataContext)
console.log("this is professorsubjects attandance page:",professorsideattandace)

//fitlering the unqiue dates from the obejct for shwoing the attandace
let uniquedate;
if (professorsideattandace) {
  let uniqueDatesSet = new Set();
  professorsideattandace.forEach((student) => {
    student.attendance.forEach((entry) => {
      entry.entires.Entires.forEach((attendance) => {
        let date = new Date(attendance.date).toISOString().slice(0, 10);
        uniqueDatesSet.add(date);
      });
    });
  });
//sorting the dates ascending order
   uniquedate = [...uniqueDatesSet].sort((a, b) => a.localeCompare(b));
  console.log("Unique dates:", uniquedate);
}


// fetching the data as the month is
useEffect(() => {
  getprofattandance(subid,selectedmonth)
}, [subid,selectedmonth])


const[professorlatitude,setprofessorlatitude]=useState()
const[professorlongitude,setprofessorlongitude]=useState()
const[professorlocationerror,setprofessorlocationerror]=useState()

useEffect(()=>
{
getlocation().then(({latitude,longitude,error})=>
{
  if(error)
    {
      console.log("error in then is:",error)
      setprofessorlocationerror(error)
    }
    else{
      console.log("professor latitude is :",latitude)
  setprofessorlatitude(latitude)

  console.log("professor longitude is:",longitude)
  setprofessorlongitude(longitude)
    }
  
}).catch((error)=>
{
  console.log("the error in catch is :",error)
  setprofessorlocationerror(error)
})
},[])

// for fetching the student data of specified month
const handlemonth=(value)=>
{

}



  return (
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"><b>Student ID</b></th>
          {
            uniquedate.map(date=>
            {
              return <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" key={date}>{date}</th>

            })
          }
         
        </tr>
      </thead>
  
      <tbody className="divide-y divide-gray-200">
  {professorsideattandace.map((student) => (
    <tr key={student.studentid} className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{student.studentid}</td>
      {uniquedate.map((date) => {
        let attendanceEntry = student.attendance.find((entry) => entry.entires.Entires.some((attendance) => new Date(attendance.date).toISOString().slice(0, 10) === date));
       let status = attendanceEntry ? attendanceEntry.entires.Entires.find((attendance) => new Date(attendance.date).toISOString().slice(0, 10) === date).status : '';
        let textColor = status === 'present' ? 'text-green-700' : 'text-red-700';
        return (
          <td key={date} className={`whitespace-nowrap px-4 py-2 font-medium ${textColor}`}>
            {status}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>

    </table>
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center',     // Center vertically
      height: '30vh',          // Full viewport height
      }}>
        <button type="button" className="btn btn-primary btn-lg " onClick={handleclick}>
        Take student attandace
      </button>
        </div>
        <select onChange={(event)=>handlemonth(parseInt(event.target.value))}>
          <option value={4}>april</option>
          <option value={5}>may</option>
        </select>
        <b>{console.log(selectedmonth)}</b>
  </div>
  )
}
