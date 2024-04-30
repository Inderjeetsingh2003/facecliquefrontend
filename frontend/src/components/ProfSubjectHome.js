import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { DataContext } from '../context/main'
import {io} from 'socket.io-client'
import { useMemo } from 'react'
import { useParams } from 'react-router'


export default function ProfSubjectHome() {

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
if(professorsideattandace)
{

   uniquedate=[...new Set(professorsideattandace.flatMap(item=>item.attendance.map(entry=>new Date(entry.entires.date).toISOString().slice(0,10))))]
  uniquedate.sort((a,b)=>a-b);
  console.log(uniquedate)
}

  useEffect(() => {
   getprofattandance(subid)
  }, [])
  
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"><b>Student ID</b></th>
          {
            uniquedate.map(date=>
            {
              return <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{date}</th>

            })
          }
         
        </tr>
      </thead>
  
     <tbody className="divide-y divide-gray-200">
        {
          professorsideattandace.map(studentid_=>
            <tr className="odd:bg-gray-50">
              
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{studentid_.studentid}</td>
            {uniquedate.map(date=>
            {
               let attandaceentry=studentid_.attendance.find(entry=>new Date(entry.entires.date).toISOString().slice(0,10)===date)
              return<td className={`whitespace-nowrap px-4 py-2 font-medium ${attandaceentry&&attandaceentry.entires.status==='present'?'text-green-700':'text-red-700'}`}>{attandaceentry?(attandaceentry.entires.status):('')}</td>
            })}
        </tr>
          )
        }
          
  
        
  
      
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
  </div>
  )
}
