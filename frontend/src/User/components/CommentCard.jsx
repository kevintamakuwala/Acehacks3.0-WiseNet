import React, { useState } from 'react'
import SolutionCard from './SolutionCard'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { TfiCommentAlt } from 'react-icons/tfi'
import CommentReplyCard from './CommentReplyCard'

const CommentCard = (props) => {
    const [isLiked , setIsLiked]= useState(false);
    let handleToggleLike = ()=>{
        setIsLiked(!isLiked)
    }
  return (
    <div>
        <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
    <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
            <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                    class="mr-2 w-6 h-6 rounded-full"
                    src={props.img}
                    alt="Michael Gough"/>{props.name}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                    title="February 8th, 2022">{props.date}</time></p>
        </div>
       
       
        
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
        {props.comment}
    </p>
    <div class="flex items-center mt-4 space-x-4">
        <button type="button"
            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
            </svg>
            Reply
        </button>
        <div className="flex items-center mb-2 sm:mb-0 mr-4">
            {" "}
            <AiOutlineLike onClick={handleToggleLike}  className={`text-gray-500 ${isLiked && 'hidden'}`} />
          <AiFillLike onClick={handleToggleLike}    className={`text-gray-500 ${!isLiked && 'hidden'}`} /><p  className={"text-gray-500"} >{" "}10</p>
          </div>
          <div className="flex items-center mx-14 sm:mx-20 mt-1">
            {" "}
            <TfiCommentAlt   className={"text-gray-500"} /> <p  className={"text-gray-500"} >{" "}10</p>
          </div>
          
    </div>
    {props.subComments.map((comment, index) => (
        <CommentReplyCard
          key={index} // Make sure to provide a unique key for each comment
          img={comment.img}
          name={comment.name}
          date={comment.date}
          comment={comment.comment}
        />
      ))}
</article></div>
  )
}

export default CommentCard