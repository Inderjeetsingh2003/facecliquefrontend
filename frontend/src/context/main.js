import React from 'react'
import { createContext,useState } from 'react'

const DataContext=createContext()
const DataProvider=({children})=> {

const host="http://localhost:4000"

    const [Studentsubject, SetStudentsub] = useState([])
    const [attandancestore,Setattandancestore]=useState()

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




    }




const context={
    Studentsubject,getstudentsub,getattandance,attandancestore,isclicked,setisclicked
}


  return (
    <DataContext.Provider value={context}>
        {children}
    </DataContext.Provider>
  )
}

export{DataContext,DataProvider}