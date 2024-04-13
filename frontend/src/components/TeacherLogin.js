import React from 'react'
import { useState } from 'react'
//import {useNavigate} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
export default function TeacherLogin() {
const [credentials, setcredentials] = useState({profId:" ",password:""})
const navigate=useNavigate()


const handleclick=async(e)=>
{
  e.preventDefault()
  console.log("fucntion is triggered")
  console.log(credentials.profId,credentials.password)
  //const host="http://localhost:4000/prof/login"
  const response=await fetch("http://localhost:4000/prof/login",
{
  method:"POST",
  //mode:"cors",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({profId:credentials.profId,password:credentials.password})
})
const json = await response.json();
console.log("Response:", json); // Add this line to check the response
if(json.success)
{
  localStorage.setItem('prof-token',json.accesstoken)
  navigate('/profhome')


}

}

const handlechange=(e)=>
{
  setcredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
   <>
   <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-lg text-center">
    <h1 class="text-2xl font-bold sm:text-3xl">FaceClique</h1>

    <p class="mt-4 text-gray-500">
     Login to Mark Attendance
    </p>
  </div>

  <form action="#" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
  <div>
      <label for="Id" class="sr-only">Professor Id</label>

      <div class="relative">
        <input
          type="text"
          placeholder='Enter professor id'
          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          name='profId'
          id="profId"
          value={credentials.profId}
          onChange={handlechange}
        />

        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" />


<path d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
<path d="M16 13.5a2.5 2.5 0 005 0V19a1 1 0 01-1 1H6a1 1 0 01-1-1v-5.5a2.5 2.5 0 105 0v1.5" />



            
          </svg>
        </span>
      </div>
    </div>
    
    
    
   

    <div>
      <label for="password" class="sr-only">Password</label>

      <div class="relative">
        <input
          type="password"
          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handlechange}
        />

        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
      </div>
    </div>

    

    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-500">
        Not registered?
        <a class="underline" href="/" >Sign up</a>
      </p>

      <button
        type="button"
        class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        onClick={handleclick} >
        Sign in
      </button>
    </div>
  </form>
</div>
   </>
  )
}
