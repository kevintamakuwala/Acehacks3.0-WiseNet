import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { AiOutlineLike } from 'react-icons/ai';

function CardAdmin({challenge}) {
    const {id, link, title, body, tags} = challenge;
    // console.log(id, link, title, body);
    
    const [showAllTags, setShowAllTags] = useState(false);
    
    const handleClickTag = () => {
        setShowAllTags(!showAllTags);
        
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
        }else{
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
        <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-gray-400 overflow-hidden m-2 h-[395px]'>
            <img src={link} alt="challenges" className='h-44 w-full object-cover' />
            <div className='flex px-3 pt-2 pb-0 justify-between'>
                {displayTags()}
                {/* <span className='border border-gray-100 bg-slate-50 rounded-sm'> &nbsp; Software Engineer(Tags) &nbsp; </span> */}
                <p className='flex items-center'><AiOutlineLike size={22} /><span>20</span></p>
            </div>
            <div className='p-4 pt-1'>
                <h2 className='description text-xl  font-semibold mb-2  '>{title}</h2>
                <Link to={`challenge/${id}`} className='text-center mt-2'>
                    <button className='px-2 py-1 w-full bg-blue-500 border border-blue-400  text-white rounded-xl font-bold mt-2'>See Detail</button>
                </Link>
            </div>
          

        </div>

    </div>
    );
}

export default CardAdmin;