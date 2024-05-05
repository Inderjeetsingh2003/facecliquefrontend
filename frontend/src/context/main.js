import React from 'react'
import { createContext,useState } from 'react'

const DataContext=createContext()

const DataProvider=({children})=> {

const host="http://localhost:4000"

    const [Studentsubject, SetStudentsub] = useState([])
    const [attandancestore,Setattandancestore]=useState()
    const [Professorsubject, SetProfessorsub]=useState([])
    const[holdingattandanceid,setholdingattandanceid]=useState()

    const[isclicked,setisclicked]=useState()

    //for getting the student subject for the home page
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

//getting the student attandance to display on the student page
    const getattandance=async(subjectcode)=>
    {
        const response=await fetch(`${host}/attandance/getstudentattandance`,
    {
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json",
            "action-token":localStorage.getItem('student-token')
        },
        body:JSON.stringify({subjectcode})
    })

        const json=await response.json()
        console.log("hi",json)
      Setattandancestore(json)

    }

//to get the subjects that the professor teaches
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



//marking the student attandance in the database
    const sendattandance=async(studentid,subjectcode,subjectname,status,attandancedate,latitude,longitude,subid)=>
    {
        console.log(attandancedate)
        console.log(subjectname)
       console.log("in the main context of sendattandance",studentid," ",subjectcode," ",status," ",attandancedate," ",subjectname," ",latitude," ",longitude)
        const response= await fetch(`${host}/attandance/markattandance`,
    {
        method:'POST',
        mode:'cors',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"studentid":"21cp202",subjectcode,status,attandancedate,subjectname})
    })
    const json=await response.json()
   if(response.ok)
   {
    setTimeout(() => {
        getattandance(subid)
    }, 500);
   }else{   
    console.log("unable to mark the attandace")
   }
    
    }

//getting the attandance for the professor
const [professorsideattandace, setprofessorsideattandace] = useState([])

const getprofattandance=async(subjectcode,month)=>
{
    console.log("the value of the month is:",typeof(month))
    const response= await fetch(`${host}/attandance/getprofessorattandance`,
{
    mode:'cors',
    method:'POST',
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({subjectcode,month})
})
if(response.ok)
{
    let json=await response.json()
    console.log("the attandace for the students for the subject is ",json)
    setprofessorsideattandace(json)

}

}



const context={
    Studentsubject,getstudentsub,getattandance,attandancestore,isclicked,setisclicked,
    Professorsubject, getprofessorsub,
    holdingattandanceid,setholdingattandanceid,sendattandance,getprofattandance,professorsideattandace
}


  return (
    <DataContext.Provider value={context}>
        {children}
    </DataContext.Provider>
  )
}

export{DataContext,DataProvider}