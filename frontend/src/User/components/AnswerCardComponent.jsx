import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { PiCertificateThin } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const AnswerCardComponent = (props) => {
  
  let {id}= useParams();
  const url = import.meta.env.VITE_URL ;
  const token = localStorage.getItem('token');
  const headers = {
      'Authorization': 'Bearer ' + token
  };
  const [isLiked, setIsLiked] = useState(props.liked);
  const [likeCnt,setLikeCnt] = useState(props.like);
  let handleToggleLike = () => {
    if (!isLiked) {
        fetch(url + `/solutions/like/${id}`, {
        method: 'POST',
        headers: headers ,
        }
        ).then(res=>res.json()).then(data=>{
            setLikeCnt(likeCnt+1);
            setIsLiked(!isLiked);
            props.setCheck(props.check);
            window.location.reload();
        }).catch(err=>{
            console.log(err);
        })
    }
    else if(isLiked){
        fetch(url + `/solutions/unlike/${id}`,  {
            method: 'POST',
            headers: headers ,
            }).then(res=>res.json()).then(data=>{
            setLikeCnt(likeCnt-1);
            setIsLiked(!isLiked);
            window.location.reload();
        }).catch(err=>{
            console.log(err);
        })
    }
   
};
  
  return (
    <div className="w-full my-2 ">
      <div className="bg-gray-50 p-1 flex items-center justify-center">
        <div className="bg-white  border-gray-200  p-2 rounded-xl border max-w-xl">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img className="h-11 w-11 rounded-full" src={props.image} />
              <div className="ml-1.5 text-sm leading-tight">
                <span className="text-black  font-bold block ">
                  {props.name}
                </span>
              </div>
            </div>
            <span className="text-gray-500  font-normal block">
              {/* <PiCertificateThin size = {30} /> */}
              { props.certificateLink && <LiaCertificateSolid size={30} />}
             
            </span>
            <div className="h-12 w-20">
              <img src="http://localhost:5273/images/logo.png"></img>
            </div>
          </div>
        
          <p className="text-black  block text-xl leading-snug mt-3">
            {props.title}
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
            {props.date}
          </p>
        
          <div className="border-gray-200  border border-b-0 my-1"></div>
          <div className="text-gray-500  flex mt-3">
            <div className="flex items-center mr-6">
              <div className="flex items-center mb-2 sm:mb-0 mr-4">
                {" "}
                <AiOutlineLike
                  onClick={handleToggleLike}
                  className={isLiked && "hidden"}
                  size={30}
                />
                <AiFillLike
                  onClick={handleToggleLike}
                  className={!isLiked && "hidden"}
                  size={30}
                />
                <p className="text-2xl">{props.like}</p>
              </div>
            </div>
            <div class="flex items-center mr-6">
              <div className="flex items-center mx-14 sm:mx-20 mt-1">
                <TfiCommentAlt size={25} />{" "}
                <p className="text-2xl ml-1 -mt-2 "> {props.comment}</p>
               
              </div>
             <Link to ={`../User-solution/${props.solutionId}`}><button>View More</button></Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCardComponent;
