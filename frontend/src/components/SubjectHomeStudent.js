import React, { useContext, useEffect, useState,useMemo } from 'react';
import { DataContext } from '../context/main.js';
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'
import{io} from 'socket.io-client'
import AttandanceNotFound from './AttandanceNotFound.js.js';
import FaceRecognition from './Facerecognization.js';

export default function SubjectHomeStudent() {
  const { getattandance, attandancestore,holdingattandanceid,enable } = useContext(DataContext);
  const { subid } = useParams();
  const navigate=useNavigate()
   const[isclicked,setisclicked]=useState(false)

   //filtering the attandance as per month
   const[selectmonth,setselectmonth]=useState(new Date().getMonth()+1)
   const handlemonth=(value)=>
   {
    setselectmonth(value)
   }
   

 const socket=useMemo(() =>io("http://localhost:4000/") , [])
 
 const[enableattandance,setenableattandance]=useState({allow:false,subid:''})
const[beforevisit,setbeforevisit]=useState({subid:'',allow:false})
 const[checkingenable,setcheckingenable]=useState(false);

  useEffect(() => {
    if(!localStorage.getItem('student-token'))
    {
        navigate("/studentlogin")
    } 
    //getting the attandance from the backend
    getattandance(subid);
  
  }
  , [subid,enable]);  // Added subid to the dependency array
  return (
    <>
      {/*
        Heads up! 👋
        This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
      */}
      {console.log("the value of the enable is :",enable)}
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
                {attandancestore.subjectattandance.entires.map((entry) => {
                  if(entry.month===selectmonth)
                  {
                    return entry.Entires.map((data) => {
                      console.log("this is date", data.date);
                      return (
                        <tr key={data._id}>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                            <b>{new Date(data.date).toLocaleDateString()}</b>
                          </td>
                          <td className={`whitespace-nowrap px-4 py-2 ${data.status === 'present' ? 'text-green-700' : 'text-red-700'}`}>
                            <b>{data.status}</b>
                          </td>
                        </tr>
                      );
                    });
                  }else{
                    return null;
                  }
  
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
     { !isclicked&&<button type="button" className="btn btn-primary btn-lg " onClick={()=>setisclicked(true) }>
        Mark your attandance
      </button>}
      {isclicked&&<FaceRecognition setisclicked={setisclicked}/>}
    </div>
    {console.log(holdingattandanceid)}
<select onChange={(event)=>handlemonth(parseInt(event.target.value))}>
  <option value={5}>may</option>
  <option value={6}>june</option>
</select>
<b>{console.log("selected month is ",selectmonth)}</b>
    </>
  );
}
