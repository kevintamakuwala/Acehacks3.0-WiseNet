import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

function Card({ challenge }) {
    // console.log(challenge);
    // console.log("here is", challenge);
    // during integration do destructuring with original object
        // console.log(challenge)
    let { challengeId, imageUrl, title, likesCount, liked, body, tags } = challenge;
    // console.log(id, link, title, body);
    const url = import.meta.env.VITE_URL ;
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    };
    const [showAllTags, setShowAllTags] = useState(liked);
    const [likeCnt,setLikeCnt] = useState(likesCount);
    const handleClickTag = () => {
       
        setShowAllTags(!showAllTags);

    };
    const [isLiked, setIsLiked] = useState(liked);

    let handleToggleLike = () => {
        if (!isLiked) {
            fetch(url + `/challenges/like/${challengeId}`, {
            method: 'POST',
            headers: headers ,
            }
            ).then(res=>res.json()).then(data=>{
                setLikeCnt(likeCnt+1);
                setIsLiked(!isLiked);
                
            }).catch(err=>{
                console.log(err);
            })
        }
        else if(isLiked){
            fetch(url + `/challenges/unlike/${challengeId}`,  {
                method: 'POST',
                headers: headers ,
                }).then(res=>res.json()).then(data=>{
                setLikeCnt(likeCnt-1);
                setIsLiked(!isLiked);
            }).catch(err=>{
                console.log(err);
            })
        }
       
    };


    const displayTags = () => {
        if (!tags || tags.length === 0) return null;

        if (showAllTags) {
            return (
                <div className='flex flex-wrap w-[80%]' >
                    {
                        tags.map((tag, index) => (
                            <span className="border border-gray-100 bg-slate-50 rounded-sm my-1 mr-4 shadow-md" key={index}>&nbsp;{tag}&nbsp;</span>
                        ))
                    }
                </div>
            )
        } else {
            const maxTagsToShow = 1;
            const remainingTagsCount = tags.length - maxTagsToShow;

            let displayedTags = tags.slice(0, maxTagsToShow).join(", ");

            if (remainingTagsCount > 0) {
                displayedTags += ` +${remainingTagsCount}`;
            }

            return (
                <div className="tags">
                    <span className="border border-gray-100 bg-slate-50 rounded-sm shadow-md" onClick={handleClickTag}>&nbsp;{displayedTags}&nbsp;</span>
                </div>
            );

        }

    };

    return (
        <div className='card-container'>
            <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-gray-400 overflow-hidden m-2 h-[420px]'>
                <img src={imageUrl} alt="challenges" className='h-44 w-full object-cover' />
                <div className='flex px-3 pt-2 pb-0 justify-between'>
                    {displayTags()}
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
                        <p className="text-2xl">{likeCnt}</p>
                    </div>
                </div>
                <div className='p-4 pt-1'>
                    <h2 className='description text-xl  font-semibold mb-2  '>{title}</h2>
                    <Link to={`../Question-answer/${challengeId}`} className='text-center mt-2'>
                        <button className='px-2 py-1 w-full bg-blue-500 border border-blue-400  text-white rounded-xl font-bold mt-2'>See Detail</button>
                    </Link>
                </div>
                <div className='flex p-4 pt-0 items-center justify-between'>
                    <div className='flex '>
                        <img src={imageUrl} alt="challenges" className='h-[40px] w-[40px] rounded-full border border-gray-300 object-cover'
                            style={{ borderWidth: '2px' }} />
                        <h2 className='text-sm  font-semibold mb-2 pl-2 pt-2 pr-6'>John Doe</h2>
                    </div>
                    <h2 className='text-sm  font-semibold mb-2 pt-1'>April 1, 2024</h2>

                </div>


            </div>

        </div>

    )
}

export default Card;