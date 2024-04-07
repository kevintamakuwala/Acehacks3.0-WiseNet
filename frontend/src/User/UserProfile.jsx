import React, { useState, useEffect } from "react";
import UserProfileComponent from "../components/UserProfileComponent";
import { useTheme } from "@emotion/react";

const UserProfile = () => {
  
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  );
    const [soltusolutionCardList ,setSolutionCardList] = useState([]);
  const [user,setUSer] = useState( null);
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const present_name = import.meta.env.VITE_UPLOAD_PRESENT;
  const url = import.meta.env.VITE_URL ;
  const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') };
  useEffect(() => {
    console.log(headers);
    fetch(url+'/users',{headers}).then(res=>res.json()).then(data=>{
      console.log(data);
      setUSer(data.user);
      setImage(data.user.photoUrl)
      console.log(data.solutionCardList);
      setSolutionCardList(data.solutionCardList)
    }).catch(err=>{
      console.log(err);
    })
  }, []);
  const handleChange = (e) => {
    setUSer({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Define the URL of your API endpoint
    user.photoUrl = image;
    console.log("i am user",user);
      let request = {
        name:user.name,
        education:user.education,
        dateOfBirth:user.dateOfBirth,
        photoUrl:user.photoUrl,
        gender:user.genderEnum
      }
      console.log(request);
      const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') };
    fetch(url+'/users', {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(request) // Convert user object to JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response body as JSON
    })
    .then(data => {
      console.log('User profile updated successfully:', data);
      // Handle success response
    })
    .catch(error => {
      console.error('Error updating user profile:', error);
      // Handle error
    });
  };
  
  const handleImageChange = (event) => {
    // console.log("hello");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cpin6sxv");
    data.append("cloud_name", import.meta.CLOUD_NAME);

    fetch(`https://api.cloudinary.com/v1_1/dsgfmlhwd/image/upload`, {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
       
        //   setProfileImage(data.url);
        localStorage.setItem("ImageUrl", data.url);
        setImage(data.url);
       
      })
      .catch((error) => {
        console.error("Error uploading to Cloudinary:", error);
      });
  };
  if(!user ){
    return <></>
  }
  return (
    <>
      <div class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <main class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div class="p-2 md:p-4">
            {/* <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> */}
            <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 class="pl-6 text-2xl font-bold sm:text-2xl ">Profile</h2>

              <div class="grid max-w-2xl mx-auto mt-8">
                <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={image}
                    // value= {user.photoUrl}
                    alt="Bordered avatar"
                  />

                  <div class="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("profileImageInput").click()
                      }
                      class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                    >
                      Change picture
                    </button>
                    <input
                      type="file"
                      id="profileImageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your Full name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your full name"
                      name="name"
                      value={user.name}
                      onChange = {handleChange}
                        required
                      />
                    </div>


                  </div>

                  <div class="mb-2 sm:mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name = "email"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your.email@mail.com"
                      onChange={handleChange}
                     value={user.email}
                      required
                    />
                  </div>

                  <div class="mb-2 sm:mb-6">
                    <label
                      for="profession"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      id="profession"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your profession"
                      name="dateOfBirth"
                      value={user.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div class="mb-6">
                    <label
                      for="message"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                     Education
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                      placeholder="Write your Education here..."
                      name="education"
                      onChange={handleChange}
                      value={user.education}
                    ></textarea>
                  </div>

                  <div class="flex justify-end">
                    <button
                      type="submit"
                      class="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      onClick={handleSubmit}                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside className="w-full text-center ">
          
          {soltusolutionCardList.map((x) => {
            return (
              <UserProfileComponent
                question={x.challengeTitle}
                answer={x.title}
                like={x.likesCount}
                comment={x.commentsCount}
              />
            );
          })}
        </aside>
      </div>
    </>
  );
};
const generateDummyDataArray = (count) => {
  const dummyData = [];
  for (let i = 0; i < count; i++) {
    dummyData.push({
      question: `Question ${i + 1}`,
      answer: `Answer to question ${i + 1}`,
      like: Math.floor(Math.random() * 100), // Generate a random number between 0 and 100 for likes
      comment: Math.floor(Math.random() * 50), // Generate a random number between 0 and 50 for comments
    });
  }
  return dummyData;
};
export default UserProfile;
