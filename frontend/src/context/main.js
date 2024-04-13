import React from 'react'
import { createContext,useState } from 'react'

const DataContext=createContext()
const DataProvider=({children})=> {

const host="http://localhost:4000"

    const [Studentsubject, SetStudentsub] = useState([])
<<<<<<< HEAD
    const [attandancestore,Setattandancestore]=useState()
=======
    const [Professorsubject, SetProfessorsub]=useState([])
>>>>>>> d3200f01d5d6c3e5708f4affc571d50237c5f135

    const[isclicked,setisclicked]=useState()
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


<<<<<<< HEAD
    const getattandance=async(subjectrefid)=>
    {
        const response=await fetch(`${host}/attandance/getstudentattandance`,
    {
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json",
            "action-token":localStorage.getItem('student-token')
        },
        body:JSON.stringify({subjectrefid})
    })

        const json=await response.json()
        console.log("hi",json)
      Setattandancestore(json)



=======

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
>>>>>>> d3200f01d5d6c3e5708f4affc571d50237c5f135

    }




const context={
<<<<<<< HEAD
    Studentsubject,getstudentsub,getattandance,attandancestore,isclicked,setisclicked
=======
    Studentsubject,getstudentsub,Professorsubject, getprofessorsub
>>>>>>> d3200f01d5d6c3e5708f4affc571d50237c5f135
}


  return (
    <DataContext.Provider value={context}>
        {children}
    </DataContext.Provider>
  )
}

export{DataContext,DataProvider}