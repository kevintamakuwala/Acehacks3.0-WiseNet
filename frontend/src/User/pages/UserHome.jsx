import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import webImg from "/images/tempImg.jpg";
import axios from'axios';
import Card from "../components/Card";

function UserHome() {

  const [datas, setDatas] = useState([]);
  
 
  useEffect(()=>{
    try {
      const fetchCurrentChallenges = async ()=>{
        //will replace api call instead of dummy data 
        const url = import.meta.env.VITE_URL + "/challenges";
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': 'Bearer ' + token
        };
        const res = await axios.get(url,
          { headers });
          
         console.log("response:  ", res.data);
        setDatas(res.data);
      }

      fetchCurrentChallenges();
      
    } catch (err) {
      //handle the error
      setDatas([]);

      if (err.response && err.response.status === 500) {
        toast.error("Something went to Wrong...");
      } else {
        toast.error("Doesn't Fetch the problems.");
      }
    }
  },[]);


  // console.log(datas);

  return (
    <section className="mx-6">
      {/* home page photo and description */}
      <div className="lg:w-9/12 md:w-[90%] px-4 mx-auto mt-12 flex flex-col md:flex-row-reverse justify-between items-center mb-4">
        {/* right side */}
        <div className="md:w-7/12 w-full shadow-md">
          <img
            src={webImg}
            alt="banner"
            className="w-full mx-auto rounded-md"
          />
        </div>

        {/* left side */}
        <div className="md:w-5/12 w-full lg:ml-0 ml-4 lg:mt-0 mt-6 mr-4">
          <h2 className="lg:text-3xl text-2xl lg:ml-0 ml-2 font-medium text-[#333] md:w-4/6 mb-3 ">
            <p>W - <span className="tracking-wider">Work</span></p>
            <p>I - <span className="tracking-wider">Innovation</span></p>
            <p>S - <span className="tracking-wider"> Solutions </span></p>
            <p>E - <span className="tracking-wider">Exchange </span></p>
            <p>Net - <span className="tracking-wider">Network</span></p>
          </h2>
          <p
            className="py-2 mb-6 text-gray-500 pl-2 border-l-4 border-indigo-600 text-xl"
            style={{ whiteSpace: "pre-line" }}
          >
            Empowering Tomorrow, {"\n"} Today: Join Our Collective Wisdom to
            Solve Challenges and Spark Innovations for Better Future.
          </p>
        </div>
      </div>

      {/* challenges */}
      <div className="lg:w-9/12 md:w-[90%] mx-auto my-28">
        <div className="my-4">
          <h1 className="text-4xl font-bold text-gray-500 tracking-wide ">Current <span className="">Challenges</span> in India</h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            datas.slice(0,Math.min(6, datas.length)).map((challenge, index) => <Card key={index} challenge={challenge}/>)
          }
        </div>
        <div className="mt-4">
        <Link to="/challenges" className="text-center flex justify-center"> <button className='px-2 py-1 lg:w-[10%] w-[35%] bg-blue-500 border border-blue-400  text-white rounded-xl font-bold mt-2'>view more</button></Link>
        </div>
      </div>


    </section>
  );
}

export default UserHome;
