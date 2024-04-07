import React, { useState } from 'react'
import control from '/images/control.png'


function Sidebar() {
    const [open, setOpen] = useState(true);
  
    return (
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-blue-100 h-[880px] p-5 mt-14  pt-8 relative duration-300 rounded-lg shadow-sm`}
        >
          <img
            src={control}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          
        </div>
    );
}

export default Sidebar;