import React, { useEffect, useState, useContext } from "react";
import api from "../components/api"; // Đường dẫn tới file api.js
import { UserContext } from "../context/UserContext"; // Đường dẫn tới UserContext
import TopContainer from "./home/topContainer";
import { Outlet } from "react-router-dom";
import LeftContainer from "./home/leftContainer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useContext(UserContext);
  if (!isAuthenticated) {
    return (
      <div className="loading-screen">
        <span class="loader">iWorks</span>
      </div>
    );
  }
  useEffect(() => {
    try {
      window.electron.send("resize", true);
      window.electron.send("maximized");
    } catch (err) {
      console.error("Not support electron!");
    }
  }, []);
  return (
    <div className="home-page">
      <TopContainer />
      <div className="body-container">
        <div className="left-nav">
          <LeftContainer />
        </div>
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Index;
