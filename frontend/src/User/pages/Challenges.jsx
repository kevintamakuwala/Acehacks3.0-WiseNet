import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import axios from'axios';
import ReactPaginate from 'react-paginate'

function Challenges() {

    const [datas, setDatas] = useState([]);
    const [pageNumber , setPageNumber]  =  useState(0);

    // pagination logic
    const cardsPerPage = 6;
    const pageCount = Math.ceil(datas.length/cardsPerPage);
    const pageVisited = pageNumber * cardsPerPage;
    const displayCards = datas.slice(pageVisited , pageVisited+cardsPerPage).map((data) => {return data});
    // console.log(displayCards)

    const changePage =({selected})=>{
        setPageNumber(selected);
    }

    useEffect(()=>{
      try {
        const fetchAllChallenges = async ()=>{
            const url = import.meta.env.VITE_URL + "/challenges";
            const token = localStorage.getItem('token');
            const headers = {
              'Authorization': 'Bearer ' + token
            };
            const res = await axios.get(url,
              { headers });
    
            // console.log("response:  ", res.data);
            setDatas(res.data); 
        }
  
        fetchAllChallenges();
        
      } catch (error) {
        console.error('Error:', error); // Handle any errors that occurred in the try block
      }
  
    },[]);
  
    //  console.log(datas);
   

  return (
    <section className="lg:mx-4 mx-0 my-10 ">
      <div className="flex gap-x-4">
        <div className="px-4">
          <Sidebar />
        </div>

        {/* challenges */}
        <div className="mx-4">
          <h1 className="text-4xl font-bold text-center text-gray-500 tracking-wide ">
                Challenges in India
          </h1>
      
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            { 
              displayCards.map((challenge, index) => (
                <Card key={index} challenge={challenge} />
              ))
            }
          </div>
          <ReactPaginate
            previousAriaLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtn"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisable"}
            activeClassName={"paginationActive"}
            
          />
       
        </div>
      </div>
    </section>
  );
}

export default Challenges;
