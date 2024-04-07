import React from 'react'

import image404 from '../public/images/404error.png'

function Error() {
  return (
   <>
     <div className='lg :m-20 sm: m-10 '>
        <div className='flex flex-col relative items-center justify-center m-5'>
           <img src={image404} alt="error" />
           <h1 className='font-serif text-4xl'>Page  Not  Found</h1>
        </div>
     </div>
   </>
  )
}

export default Error;