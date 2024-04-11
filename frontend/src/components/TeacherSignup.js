import React from 'react'
//import imageSrc from './1.png';

export default function TeacherSignup() {
  return (
   <>

<section class="bg-white">
  <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 ">
       <img
        alt="" 
        src="img/profimg.png"
        class="absolute inset-0 h-full w-full object-cover opacity-80"
        style={{ bottom: '-20px' }}      />

      <div class="hidden lg:relative lg:block lg:p-12">
        <a class="block text-white" href="/">
          <span class="sr-only">Home</span>
         
        </a>

        <h2 class="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
          Welcome to FaceClique
        </h2>

        <p class="mt-4 leading-relaxed text-black/90">
          Attendance using face recognition
        </p>
      </div>
    </section>

    <main
      class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div class="max-w-xl lg:max-w-3xl">
        <div class="relative -mt-16 block lg:hidden">
          <a
            class="inline-flex size-16 items-center justify-center"
            href="/"
          >
            
          </a>

          <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to FaceClique
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
            Attendance using Face Recognition
          </p>
        </div>

        <form action="#" class="mt-8 grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label for="FirstName" class="block text-sm font-medium text-gray-700">
              Professor Id
            </label>

            <input
              type="text"
              id="ProfId"
              name="prof_id"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="LastName" class="block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              id="Name"
              name="name"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-3">
            <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
        

            <div class="col-span-3">
            <label for="Department" class="block text-sm font-medium text-gray-700"> Department </label>

            <input
              type="department"
              id="department"
              name="department"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div class="col-span-6">
            <label for="Subjects" class="block text-sm font-medium text-gray-700"> Subjects </label>

            <textarea id="subjects" name="subjects" rows="4" class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"></textarea>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="PasswordConfirmation" class="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

         

        

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Sign Up
            </button>

            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
              Already registered?
              <a href="/teacherlogin" class="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
   </>
  )
}

