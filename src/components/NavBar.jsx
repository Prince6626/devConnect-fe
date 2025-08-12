import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, User, Users, Mail, LogOut, Home } from "lucide-react";
import { BASE_URL } from "../utils/constance";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="navbar bg-[#121212] border-b border-gray-800 shadow-2xl backdrop-blur-md relative z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex-1">
        <Link to="/" className="flex items-center group">
          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Professional Logo Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center shadow-xl border border-slate-700/50 backdrop-blur-sm">
              <div className="relative">
                <Code2 className="w-6 h-6 text-slate-200" strokeWidth={1.5} />
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Professional Logo Text */}
            <div className="flex flex-col">
              <span
                className="text-2xl font-bold text-white tracking-tight"
                style={{
                  fontFamily:
                    "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                dev<span className="text-blue-400">Connect</span>
              </span>
              <span
                className="text-xs text-slate-400 font-medium tracking-wide uppercase hidden sm:block"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                Professional Network
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
      {user && (
        <motion.div
          className="flex gap-4 items-center relative z-50"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Desktop Navigation Buttons - Hidden on Mobile */}
          <div className="hidden md:flex gap-2">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Feed</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/connections"
                className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-green-600/20 hover:border-green-500/50 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Connections</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/requests"
                className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Requests</span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Welcome Message - Hidden on Mobile */}
          <div className="hidden lg:block text-gray-300 text-sm font-medium px-4 py-2 rounded-full bg-[#1F2937]/50 border border-gray-700/50 backdrop-blur-sm shadow-sm">
            Welcome,{" "}
            <span className="text-blue-400 font-semibold">
              {user.firstName}
            </span>
          </div>

          {/* Profile Dropdown - Works for both Desktop and Mobile */}
          <div className="dropdown dropdown-end mx-2 md:mx-5 flex relative z-50">
            <motion.div
              tabIndex={0}
              role="button"
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-0.5 shadow-xl border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                <img
                  alt="user photo"
                  src={user.photoUrl}
                  className="w-full h-full rounded-full object-cover bg-gray-800"
                />
              </div>
            </motion.div>
            <motion.ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#121212] border border-gray-800 rounded-2xl mt-3 w-56 p-3 shadow-2xl backdrop-blur-md relative z-[60]"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ zIndex: 60 }}
            >
              {/* Mobile Navigation Items - Only visible on mobile */}
              <div className="block md:hidden">
                <motion.li whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white hover:bg-blue-600/20 rounded-xl p-3 flex items-center gap-3 transition-all duration-300"
                  >
                    <Home className="w-4 h-4" />
                    <span>Feed</span>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                  <Link
                    to="/connections"
                    className="text-gray-300 hover:text-white hover:bg-green-600/20 rounded-xl p-3 flex items-center gap-3 transition-all duration-300"
                  >
                    <Users className="w-4 h-4" />
                    <span>Connections</span>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                  <Link
                    to="/requests"
                    className="text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-xl p-3 flex items-center gap-3 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Requests</span>
                  </Link>
                </motion.li>
                <div className="divider my-2 border-gray-800"></div>
              </div>

              {/* Profile Item - Always visible */}
              <motion.li whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl p-3 flex items-center gap-3 transition-all duration-300 justify-between"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </div>
                  <span className="badge badge-primary badge-sm">Edit</span>
                </Link>
              </motion.li>

              {/* Divider - only show if we have mobile nav items above */}
              <div className="divider my-2 border-gray-800 hidden md:block"></div>

              {/* Logout - Always visible */}
              <motion.li whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                <a
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl p-3 flex items-center gap-3 transition-all duration-300 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </a>
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NavBar;
