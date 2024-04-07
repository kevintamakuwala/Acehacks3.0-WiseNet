import React from 'react'

const SolutionCard = (props) => {
  return (
    <div><main class="mt-10 ">

    <div class="mb-4 md:mb-0 w-full mx-auto relative ">
      <div class="px-4 lg:px-0">
        <h2 class="lg:ms-10 text-4xl font-semibold text-gray-800 leading-tight">
        {props.challengeTitle}
        </h2>
        
      </div>

     
    </div>

    <div class="flex flex-col lg:flex-row lg:space-x-12 ">

      <div class="px-4 lg:px-0 lg:ms-10 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4 border shadow-lg p-3">
       

      <div class="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
        {props.solutionTitle}
        </div>

        <p class="pb-6 p-2">{props.description1}</p>

          <p class="pb-6 p-2">{props.description2}</p>

          <p class="pb-6 p-2">{props.description3}</p>

        {/* <h2 class="text-2xl text-gray-800 font-semibold mb-4 mt-4">Uneasy barton seeing remark happen his has</h2> */}

        

      </div>

      <div class="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
        <div class="p-4 border-t border-b md:border md:rounded">
          <div class="flex py-2">
            <img src={props.photoUrl}
              class="h-10 w-10 rounded-full mr-2 object-cover" />
            <div>
              <p class="font-semibold text-gray-700 text-sm">{props.username} </p>
              
            </div>
          </div>
          
          
        </div>
        <div>
            Certificate
        </div>
      </div>

    </div>
  </main></div>
  )
}

export default SolutionCard