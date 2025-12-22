import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      // Don't redirect to login automatically - let users see landing page
      // Only redirect if they try to access protected routes
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect authenticated users from landing page to feed
  useEffect(() => {
    if (userData && window.location.pathname === '/') {
      navigate('/feed');
    }
  }, [userData, navigate]);

  // Show footer only on landing and login pages (for unauthenticated users)
  const showFooter = !userData && (location.pathname === '/' || location.pathname === '/landing' || location.pathname === '/login');

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Body;
