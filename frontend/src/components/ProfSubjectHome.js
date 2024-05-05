import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { DataContext } from '../context/main'
import {io} from 'socket.io-client'
import { useMemo } from 'react'
import { useParams } from 'react-router'


export default function ProfSubjectHome() {
  const[selectedmonth,setselectmonth]=useState(new Date().getMonth()+1)
  const{subid}=useParams()
// setting up the socket connection
 const socket=useMemo(() => io('http://localhost:4000/'), [])

useEffect(() => {
  socket.on("connect",()=>
{
  console.log("socket is connected")
  console.log(socket.id)
})
}, [])
const[enableattandance,setenableattandance]=useState(false)

const handleclick=async(e)=>
{

  setenableattandance(true)
  socket.emit("enableattandance",{enableattandance:true,subid})
}

const{getprofattandance,professorsideattandace}=useContext(DataContext)
console.log("this is professorsubjects attandance page:",professorsideattandace)

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

   uniquedate = [...uniqueDatesSet].sort((a, b) => a.localeCompare(b));
  console.log("Unique dates:", uniquedate);
}



useEffect(() => {
  getprofattandance(subid,selectedmonth)
}, [subid,selectedmonth])



// for fetching the student data of specified month

const handlemonth=(value)=>
{
setselectmonth(value)
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
