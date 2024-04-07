import React, { useEffect, useState } from "react";
import logo from "/images/logo.png";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router";

const Registration = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;
  useEffect(() => {
    fetch(url + "/tags")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let tag = [];
        for (let p of data) {
          tag.push({ ["value"]: p.tagName, ["label"]: p.tagName });
        }
        setTags(tag);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "male", // Default value
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    for (let i of selectedTags) {
      formData.tags.push(i.value);
    }

    console.log(url);
    // Send formData to the server using fetch
    fetch(url + "/auth/signup/USER", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 500) {
          navigate("/login");
        } else {
          throw new Error();
        }

        // Handle success response from the server
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error response from the server
      });
  };
  return (
    <div>
      <section className="bg-white ">
        <div className="container px-6 py-24 mx-auto lg:py-32">
          <div className="lg:flex m-8">
            <div className="lg:w-1/2">
              <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
              <h1 className="mt-4 text-gray-600  md:text-lg">Welcome </h1>
              <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl ">
                Registration to new account
              </h1>
            </div>
            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form className="w-full lg:max-w-xl" onSubmit={handleSubmit}>
                <div className="relative flex items-center border border-black rounded-md">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative flex items-center mt-4 border border-black rounded-md">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    className="block w-full px-10 py-3 text-black bg-white border rounded-lg  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <div className="relative flex items-center mt-4 border border-black rounded-md">
                  <span className="absolute"></span>
                  <input
                    type="text"
                    className="block w-full px-10 py-3 text-black bg-white border rounded-lg   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                  />
                </div>

                {/* Gender */}
                <div className="mt-4">
                  <label className="block mb-4 ml-2 text-gray-600  text-xl">
                    Gender
                  </label>
                  <div className="mt-2 ml-4  flex gap-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="gender"
                        value="MALE"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio"
                        name="gender"
                        value="FEMALE"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-4 ml-2 text-gray-600  text-xl">
                    Select a Tags
                  </label>
                  <CreatableSelect
                    className="block w-full flex-1 border-1 bg-white py-3 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    value={selectedTags}
                    onChange={handleTagsChange}
                    options={tags}
                    isMulti
                  />
                </div>
                <div className="mt-8 md:flex md:items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
