import React, { useContext } from 'react'
import { useEffect } from 'react'
import { DataContext } from '../context/main'
export default function ProfSubjectHome() {
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
   getprofattandance("3cp10")
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
  </div>
  )
}
