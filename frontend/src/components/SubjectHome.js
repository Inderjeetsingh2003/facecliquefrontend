import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/main';
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'
import AttandanceNotFound from './AttandanceNotFound.js';
import FaceRecognition from './Facerecognization.js';

export default function SubjectHome() {
  const { getattandance, attandancestore,holdingattandanceid } = useContext(DataContext);
  const { subid } = useParams();
  const navigate=useNavigate()
   const[isclicked,setisclicked]=useState(false)


  useEffect(() => {
    if(!localStorage.getItem('student-token'))
    {
        navigate("/studentlogin")
    }
    
    getattandance(subid);
  }, [subid]);  // Added subid to the dependency array




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
                          {new Date(data.date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {data.status}
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
     { !isclicked&&<button type="button" className="btn btn-primary btn-lg " onClick={()=>setisclicked(true)}>
        Mark your attandance
      </button>}
      {isclicked&&<FaceRecognition setisclicked={setisclicked}/>}
    </div>
    {console.log(holdingattandanceid)}

    </>
  );
}
