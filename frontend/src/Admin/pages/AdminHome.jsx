import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CardAdmin from '../components/CardAdmin';
import ReactPaginate from 'react-paginate'

function AdminHome() {

  const [datas, setDatas] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  // pagination logic
  const cardsPerPage = 6;
  const pageCount = Math.ceil(datas.length / cardsPerPage);
  const pageVisited = pageNumber * cardsPerPage;
  const displayCards = datas.slice(pageVisited, pageVisited + cardsPerPage).map((data) => { return data });
  // console.log(displayCards)

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  useEffect(() => {
    try {
      const fetchCurrentChallengesInAdminHome = async () => {
        //will replace by api call instead of dummy data 
        const res = await axios.get('data.json');

        setDatas(res.data);
      }

      fetchCurrentChallengesInAdminHome();

    } catch (error) {
      //handle the error
      console.log("Error in home page of admin..." + error)
    }

  }, []);

  // console.log("data at admin sidee", datas);

  return (
    <section className="mx-6">
      <div className="lg:w-9/12 md:w-[90%] mx-auto my-16">
        <div className="my-4">
          <h1 className="text-4xl font-bold text-center text-gray-500 tracking-wide ">Posted <span className="">Challenges</span></h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            displayCards.slice(0, 6).map((challenge, index) => <CardAdmin key={index} challenge={challenge} />)
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
    </section>
  )
}

export default AdminHome;