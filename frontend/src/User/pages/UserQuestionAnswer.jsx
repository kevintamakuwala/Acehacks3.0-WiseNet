import React, { useEffect, useState } from "react";
import AnswerCardComponent from "../components/AnswerCardComponent";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const dummyData = [
 
  {
    name: "Jane Smith",
    title:
      "Praesent fermentum magna nec lectus pretium, ac fermentum turpis varius.",
    image: "https://example.com/image2.jpg",
    like: 20,
    comment: 10,
  },
  {
    name: "Alice Johnson",
    title:
      "Nullam id velit vel justo sodales pharetra.Praesent fermentum magna nec lectus pretium,",
    image: "https://example.com/image3.jpg",
    like: 8,
    comment: 3,
  },
  {
    name: "John Doe",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet.",
    image: "https://example.com/image1.jpg",
    like: 15,
    comment: 5,
  },
];
const UserQuestionAnswer = () => {
  const {id} = useParams();
    const [data,setData] = useState();
    const [card,setCard] = useState();
    const [check,setCheck] = useState(false);
    useEffect(()=>{
      try {
        const fetchCurrentChallenges = async ()=>{
          //will replace api call instead of dummy data 
          const url = import.meta.env.VITE_URL + "/challenges/"+id;
          const url2 = import.meta.env.VITE_URL + "/solutions/"+id+'/0/'+'2';
          const token = localStorage.getItem('token');
          const headers = {
            'Authorization': 'Bearer ' + token
          };
          const res = await axios.get(url,
            { headers });
            const response = await axios.get(url2,
              { headers });
              
           console.log("response:  ", res.data);
           console.log("response:  ", response.data);
          setData(res.data);
          setCard(response.data);
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
    if(!data || !card){
      return <></>
    }
  return (
    <div className="lg:grid grid-cols-10 mx-6 gap-2 my-4">
      <div className="border col-span-6 h-full ">
        <main className="container mx-auto mt-8 w-full ">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-full px-4 mb-8">
              <img
                src={data.imageUrl}
                alt="Featured Image"
                className="w-full h-64 object-cover rounded"
              />
              <h2 className="text-4xl font-bold mt-4 mb-2">
               {data.title}
              </h2>
              <p className="text-gray-700 mb-4">
               {data.description}
              </p>
             
            </div>
          </div>
        </main>
      </div>
      <div className="border col-span-4">
        <div className="border col-span-4 h-4/5 overflow-y-auto ">
          {card.solutions.map((data, index) => (
            <AnswerCardComponent
              key={index}
              name={data.name}
              title={data.title}
              image={data.photoLink}
              like={data.likesCount}
              comment={data.commentsCount}
              date = {data.postedAt.substring(0,10)}
              liked = {data.isLiked}
              check = {check}
              setCheck ={setCheck}
              solutionId = {data.solutionId}
            />
          ))}
        </div>
        <div className="flex p-3">
          <Link
            to=""
            className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Previous
          </Link>
          <Link
            to=""
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserQuestionAnswer;
