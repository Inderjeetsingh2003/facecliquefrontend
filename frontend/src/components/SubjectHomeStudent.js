import React, { useContext, useEffect, useState,useMemo } from 'react';
import { DataContext } from '../context/main.js';
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'
import{io} from 'socket.io-client'
import AttandanceNotFound from './AttandanceNotFound.js.js';
import FaceRecognition from './Facerecognization.js';

export default function SubjectHomeStudent() {
  const { getattandance, attandancestore,holdingattandanceid } = useContext(DataContext);
  const { subid } = useParams();
  const navigate=useNavigate()
   const[isclicked,setisclicked]=useState(false)
   //const[checkingenable,setcheckingenable]=useState()

 const socket=useMemo(() =>io("http://localhost:4000/") , [])
 
 const[enableattandance,setenableattandance]=useState({allow:false,subid:''})
const[beforevisit,setbeforevisit]=useState({subid:'',allow:false})
 const[checkingenable,setcheckingenable]=useState(false);
let beforesubid;
let beforeallow;
  useEffect(() => {
    if(!localStorage.getItem('student-token'))
    {
        navigate("/studentlogin")
    } 
    //getting the attandance from the backend
    getattandance(subid);


 //getting the event to enable the button or not to mark the attandance 
    socket.on('nowgive',(enable)=>
  {
    console.log("the value of enable from the backend is :",enable.enableattandance," " ,enable.subid)
   setenableattandance({
    allow:enable.enableattandance,
    subid:enable.subid
   })
  
    
  })
    socket.on('beforelaodandclicked',({allowattandance})=>
  {
    console.log("if the professor as already clicked the button then values are:",allowattandance.subid," c c",allowattandance.enable)
    beforesubid=allowattandance.subid
    beforeallow=allowattandance.enable
  })

  
  }
  , [subid]);  // Added subid to the dependency array


  useEffect(() => {
    console.log("the value of the enbale attandance is :",enableattandance.allow," ",enableattandance.subid)
    //console.log("the value of the enbale before visit :",beforevisit)
    console.log('v beforesub',beforesubid)
    console.log("v before allow",beforeallow)
    if((enableattandance.allow ||beforeallow )&&(enableattandance.subid===subid||beforesubid))
    {
      setcheckingenable(true)
    }

    setTimeout(() => {
console.log("the before visitt vairable is:",beforesubid, " ",beforeallow)
    }, 5000);

    return () => {
      socket.off('nowgive');
    }
   
  }, [enableattandance])
  



  return (
    <>
      {/*
        Heads up! 👋
        This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
      */}
      {console.log("this is inside the subject page:", attandancestore)}
      {attandancestore && attandancestore.success ? (
        <>
          {attandancestore.subjectattandance && attandancestore.subjectattandance.entires.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attandancestore.subjectattandance.entires.map((data) => {
                    console.log(data.date);  // Moved outside the return statement
                    return (
                      <tr key={data._id}>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                         <b>{new Date(data.date).toLocaleDateString()}</b> 
                        </td>
                        <td className={`whitespace-nowrap px-4 py-2 ${data.status==='present'?'text-green-700':'text-red-700'}`}>
                         <b>{data.status}</b> 
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
         <div>loading...</div>
          )}
        </>
      ) : (
        <AttandanceNotFound/>

      )}
     <div style={{
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center',     // Center vertically
      height: '30vh',          // Full viewport height
      }}>
     { !isclicked&&<button type="button" className="btn btn-primary btn-lg " onClick={()=>setisclicked(true) } disabled={!checkingenable} >
        Mark your attandance
      </button>}
      {isclicked&&<FaceRecognition setisclicked={setisclicked}/>}
    </div>
    {console.log(holdingattandanceid)}

    </>
  );
}
