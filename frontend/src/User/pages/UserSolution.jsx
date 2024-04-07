import React, { useEffect, useState } from 'react'
import CommentCard from '../components/CommentCard'
import CommentReplyCard from '../components/CommentReplyCard'
import SolutionCard from '../components/SolutionCard'
import { Await, useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const UserSolution = () => {

    const commentsData = [
        {
          img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
          name: "John Doe",
          date: "2024-03-28",
          comment: "This is the first comment. It could be a longer comment or a short one.",
        },
        {
          img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
          name: "Jane Smith",
          date: "2024-03-29",
          comment: "This is the second comment.",
        }, {
            img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            name: "John Doe",
            date: "2024-03-28",
            comment: "This is the first comment. It could be a longer comment or a short one.",
          },
          {
            img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            name: "Jane Smith",
            date: "2024-03-29",
            comment: "This is the second comment.",
          },
    ]
    const handleSubmit = ()=>{
      const url = import.meta.env.VITE_URL
      const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') };
      fetch(url+`/comments/0/${data.solutionId}/-1`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(comment) // Convert user object to JSON string
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.reload();
        const currentDate = new Date();
        const timestamp = currentDate.toISOString();
       
        return response.json(); // Parse response body as JSON
      })
      .then(data => {
        toast.success("Problem posted Successfully.");
        console.log('Problem posted success', data);
        // Handle success response
      })
      .catch(error => {
        toast.error("Didn't post any Suggestion for a problem");
        console.error('Error updating user profile:', error);
        // Handle error
      });
  
    
    }
    const [data,setData] = useState(null);
    const {id} = useParams();
    const [comment,setComment] = useState(null);
    const [comments,setComments] = useState([]);
    useEffect(()=>{
      try {
        const fetchCurrentChallenges = async ()=>{
          //will replace api call instead of dummy data 
          const url = import.meta.env.VITE_URL + "/solutions/"+id;
          const url2 = import.meta.env.VITE_URL + "/comment";
         
          const token = localStorage.getItem('token');
          const headers = {
            'Authorization': 'Bearer ' + token
          };
          const res = await axios.get(url,
            { headers });
           
           console.log("response:  ", res.data);
          setData(res.data);
         
        }
  
        fetchCurrentChallenges();
        
      } catch (err) {
        //handle the error
        setData([]);
  
        if (err.response && err.response.status === 500) {
          toast.error("Something went to Wrong...");
        } else {
          toast.error("Doesn't Fetch the problems.");
        }
      }
    },[]);
    if(!data){
      return <></>
    }
  return (
    <div>
        <SolutionCard
        challengeTitle={data.challengeTitle}
        solutionTitle={data.solutionTitle}
        description1={data.description1}
        description2={data.description2}
        description3={data.description3}
        username={data.username}
        photoUrl = {data.photoUrl}
      />
        
        <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
    <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
      </div>
      <form class="mb-6">
          <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" class="sr-only">Your comment</label>
              <textarea id="comment" rows="6"
                  class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..." 
                  required
                  onChange={(e)=>{
                    setComment({...comment,['content']:e.target.value})
                  }}
                  ></textarea>
          </div>
         
      </form>
      <button 
          onClick={handleSubmit}
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center  dark:text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 border">
              Post comment
          </button>
      {data.comments.map((comment, index) => (
        <CommentCard
          key={index} // Make sure to provide a unique key for each comment
          img={comment.userPhoto}
          name={comment.name}
          date={comment.date}
          comment={comment.content}
          subComments = {comment.subComments}
        />
      ))}
      
      
    
     
     
    </div>
  </section></div>
  )
}

export default UserSolution