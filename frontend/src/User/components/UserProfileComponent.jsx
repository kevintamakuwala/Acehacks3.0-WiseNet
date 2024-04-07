import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
const UserProfileComponent = (props) => {
  return (
    <div class="w-full  bg-white shadow-md border border-gray-300 box-border block rounded-lg shadow-secondary-1 text-surface my-4">
      <div class="p-6">
        <h5 class="mb-2 text-xl font-medium leading-tight">{props.question}</h5>
        <p class="mb-4 text-base">{props.answer}</p>
        <div className="flex  justify-center items-center ">
          <div className="flex items-center mb-2 sm:mb-0 mr-4">
            {" "}
            <AiOutlineLike size={30} /> <p className="text-2xl">{props.like}</p>
          </div>
          <div className="flex items-center mx-14 sm:mx-20 mt-1">
            {" "}
            <TfiCommentAlt size={25}  /> <p className="text-2xl ml-1 -mt-2 ">{" "}{props.comment}</p>
          </div>
         <div>
          <button
              type="submit"
              class="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              View More
            </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
