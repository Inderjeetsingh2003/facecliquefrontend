import React from 'react'
import { Link } from 'react-router-dom'
export default function LandingPage() {
  return (
    <div>     <section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="img/Designer.png"/>
      <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"><b>FaceClique</b> -Attendance made simple, just a smile away!</h1>
        <p className="mb-8 leading-relaxed">Wave goodbye to traditional attendance methods, and say hello to the <b>future of education - where every face counts..</b></p>
        <div className="flex justify-center">
         <Link to ="/studentlogin"> <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">As Student</button></Link>
         <Link to='/proflogin'><button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">As Professor</button></Link> 
        </div>
      </div>
    </div>
  </section></div>
  )
}
