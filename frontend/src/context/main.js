import React from 'react'
import { createContext,useState } from 'react'
const DataContext=createContext()
const DataProvider=({children})=> {

const host="http://localhost:4000"

    const [Studentsubject, SetStudentsub] = useState([])
    const [Professorsubject, SetProfessorsub]=useState([])


    const getstudentsub=async()=>
    {
        try{
            const response=await fetch(`${host}/student/getstudent`,
            {
                method:'GET',
                mode:'cors',
                headers:{
                    'Content-Type':"application/json",
                    'action-token':localStorage.getItem('student-token')
                }
            })
            
            if(!response.ok)
            {
                console.log("failed to fetch")
            }
            
            const json=await response.json()
            console.log(json);
            SetStudentsub(json)
            //console.log("this is studentsub state",Studentsub)
        }
        catch(error)
        {
            console.log("this is frontend getstudentsub, unable to fetch")
            console.log(error.message)
        }

    }



    const getprofessorsub=async()=>
    {
        try{
            const response=await fetch(`${host}/prof/getprof`,
            {
                method:'GET',
                mode:'cors',
                headers:{
                    'Content-Type':"application/json",
                    'action-token':localStorage.getItem('prof-token')
                }
            })
            if(!response.ok)
            {
                console.log("failed to fetch")
            }
            
            console.log(response)
            const json=await response.json()
            console.log(json);
            SetProfessorsub(json)
            //console.log("this is studentsub state",Studentsub)
        }
        catch(error)
        {
            console.log("this is frontend getprofessorsub, unable to fetch")
            console.log(error.message)
        }

    }




const context={
    Studentsubject,getstudentsub,Professorsubject, getprofessorsub
}


  return (
    <DataContext.Provider value={context}>
        {children}
    </DataContext.Provider>
  )
}

export{DataContext,DataProvider}