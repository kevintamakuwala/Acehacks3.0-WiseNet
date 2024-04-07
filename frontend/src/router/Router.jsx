// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import AdminHome from "../Admin/pages/AdminHome";
// import PostChallenges from "../Admin/pages/PostChallenges";

// import UserHome from "../User/pages/UserHome";
// import App from "../App";
// import Error from "../Error";
// import UserProfile from "../User/pages/USerProfile";
// import UserQuestionAnswer from "../User/pages/UserQuestionAnswer";
// import Challenges from "../User/pages/Challenges";
// import Contact from "../User/pages/Contact";
// import UserSolution from "../User/pages/UserSolution";
// import PostSolution from "../User/pages/PostSolution";
// import Registration from "../User/pages/Registration";
// import Login from "../Login";

// const Router = () => (
//   <Routes>
//     <Route path="/" element={<App />}>
//       <Route index element={<UserHome />} />
//       <Route path="admin-home" element={<AdminHome />} />
//       <Route path="post-challenges" element={<PostChallenges />} />
//       <Route path="user-home" element={<UserHome />} />
//       <Route path="challenges" element={<Challenges />} />
//       <Route path="contact" element={<Contact />} />
//       <Route path="User-Profile" element={<UserProfile />} />
//       <Route path="Question-Answer" element={<UserQuestionAnswer />} />
//       <Route path="User-solution" element={<UserSolution />} />
//       <Route path="post-solution" element={<PostSolution />} />
//       <Route path="contact-us" element={<Contact />} />
//     </Route>
//     <Route path="Registration" element={<Registration />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="*" element={<Error />} />
//   </Routes>
// );

// export default Router;
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../Admin/pages/AdminHome";
import PostChallenges from "../Admin/pages/PostChallenges";

import UserHome from "../User/pages/UserHome";
import App from "../App";
import Error from "../Error";
import UserProfile from "../User/pages/USerProfile";
import UserQuestionAnswer from "../User/pages/UserQuestionAnswer";
import Challenges from "../User/pages/Challenges";
import Contact from "../User/pages/Contact";
import UserSolution from "../User/pages/UserSolution";
import PostSolution from "../User/pages/PostSolution";
import Registration from "../User/pages/Registration";
import Login from "../Login";
import { Navigate } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            localStorage.getItem("token") ? (
              <UserHome />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="admin-home"
          element={
            localStorage.getItem("token") ? (
              <AdminHome />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="post-challenges"
          element={
            localStorage.getItem("token") ? (
              <PostChallenges />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="user-home"
          element={
            localStorage.getItem("token") ? (
              <UserHome />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="challenges"
          element={
            localStorage.getItem("token") ? (
              <Challenges />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="contact"
          element={
            localStorage.getItem("token") ? (
              <Contact />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="User-Profile"
          element={
            localStorage.getItem("token") ? (
              <UserProfile />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="Question-Answer/:id"
          element={
            localStorage.getItem("token") ? (
              <UserQuestionAnswer />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="User-solution/:id"
          element={
            localStorage.getItem("token") ? (
              <UserSolution />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="post-solution"
          element={
            localStorage.getItem("token") ? (
              <PostSolution />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="contact-us"
          element={
            localStorage.getItem("token") ? (
              <Contact />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default Router;
