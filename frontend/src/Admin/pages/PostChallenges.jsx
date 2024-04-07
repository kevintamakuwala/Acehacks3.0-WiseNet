import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreatableSelect from "react-select/creatable";
import toast, { Toaster } from "react-hot-toast";


function PostChallenges() {
  
  const [postChallenge, setPostChallenge] = useState({
    title:'',
    description:'',
    challengeTags:[],
    imageUrl:'',
    author:'admin'

  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags,setTags] = useState([]);
 
  const url = import.meta.env.VITE_URL;

  useEffect(()=>{
      fetch(url+'/tags').then(res=>res.json()).then(data=>{
          let tag= [];
          for(let p of data){
              tag.push({['value']:p.tagName ,['label']:p.tagName})
          }
          setTags(tag);
          
          
      }).catch(err=>{
          console.log(err);
      })
  },[])
  
  const handleClick = (e)=>{

    for(let  i of  selectedTags){
      postChallenge.challengeTags .push(i.value);
      
  }

  console.log("Posted challengw",postChallenge)
    
  const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') };
    fetch(url+'/challenges', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(postChallenge) // Convert user object to JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response body as JSON
    })
    .then(data => {
      console.log('Problem posted success', data);
      // Handle success response
    })
    .catch(error => {
      console.error('Error updating user profile:', error);
      // Handle error
    });

  }
  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
};

  const handlePostChallenge = (e)=>{
    const { name, value } = e.target;

    setPostChallenge(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  

  return (
    <section className="max-w-4xl p-6 mx-auto bg-blue-50 rounded-md shadow-md border border-gray-100 my-16">
      <form>
        <h1 className="text-2xl font-bold text-black uppercase dark:text-white mb-2">
          Post the Challenge
        </h1>
        <hr className="border-2 bg-slate-50" />
        <div className="gap-6 mt-4">
          <div>
            <label className="text-black text-lg dark:text-gray-200">
              Problem Title:
            </label>
            <input
              id="problem-title"
              name="title"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring"
              onChange={handlePostChallenge}
            />
          </div>

          <div className="gap-6 mt-4">
            <label className="text-black dark:text-gray-200" >
              Problem Description:  
            </label>
            <textarea
              id="problem-description"
              type="text"
              name="description"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring"
              rows={6}
              onChange={handlePostChallenge}
            />
          </div>

          <div className="gap-6 mt-4">
        
            <label className="text-black dark:text-gray-200">Required Skill Sets</label>
            <CreatableSelect
              className="block w-full  border-1 py-1.5 pl-3 text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              value={selectedTags} onChange={handleTagsChange} options={tags}
              isMulti
   
            >
              {" "}
            </CreatableSelect>
      
          </div>

          <div className="gap-6 mt-4">
            <label className="block text-md  text-black">Upload Image:</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-black border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-black"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    className="relative cursor-pointer  rounded-md font-medium text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ringblack"
                  >
                    <span className="">Upload a Photo</span>
                    <input
                      id="file-upload"
                      name="imageUrl"
                      type="file"
                      className="sr-only"
                      onChange={handlePostChallenge}
                    />
                  </label>
                  <p className="pl-1 text-black">or drag and drop</p>
                </div>
                <p className="text-xs text-black">PNG, JPG, JPEG up to 1MB</p>
              </div>
            </div>
          </div>
        </div>

        
      </form>
      <div className="flex justify-end mt-6">
          <button onClick={handleClick} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md focus:outline-none focus:bg-gray-600 hover:bg-blue-400 ">
            Save
          </button>
        </div>
    </section>
  );
}

export default PostChallenges;
