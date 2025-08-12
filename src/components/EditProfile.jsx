import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Save,
  Eye,
  Check,
  AlertCircle,
  Camera,
  Hash,
} from "lucide-react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constance";

const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user.firstName || "");
  const [lastName, setLastname] = useState(user.lastName || "");
  const [about, setAbout] = useState(user.about || "");
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setphotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(
    user.skills ? user.skills.join(", ") : ""
  );
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      // Convert skills string to array
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          age,
          photoUrl,
          gender,
          skills: skillsArray,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (err) {
      setError(err?.response?.data);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const formFields = [
    {
      label: "First Name",
      value: firstName,
      setter: setFirstname,
      type: "text",
      icon: User,
    },
    {
      label: "Last Name",
      value: lastName,
      setter: setLastname,
      type: "text",
      icon: User,
    },
    {
      label: "About",
      value: about,
      setter: setAbout,
      type: "text",
      icon: User,
    },
    { label: "Age", value: age, setter: setAge, type: "number", icon: Hash },
    {
      label: "Profile Picture",
      value: photoUrl,
      setter: setphotoUrl,
      type: "url",
      icon: Camera,
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] py-8 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50 backdrop-blur-sm mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <User className="w-6 h-6 text-blue-400" />
            <span className="text-gray-300 font-medium">Profile Settings</span>
          </motion.div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Edit Your Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Update your information and see changes in real-time
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-center gap-8">
          {/* Edit Form */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-6">
                {formFields.map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <motion.div
                      key={field.label}
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <label className="text-gray-300 font-medium text-sm flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-blue-400" />
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm"
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Gender Select */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="text-gray-300 font-medium text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-400" />
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" className="bg-gray-800">
                        Select Gender
                      </option>
                      <option value="male" className="bg-gray-800">
                        Male
                      </option>
                      <option value="female" className="bg-gray-800">
                        Female
                      </option>
                      <option value="others" className="bg-gray-800">
                        Others
                      </option>
                    </select>
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Skills Input */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="text-gray-300 font-medium text-sm flex items-center gap-2">
                    <Hash className="w-4 h-4 text-blue-400" />
                    Skills
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Separate multiple skills with commas
                  </p>
                </motion.div>

                {/* Save Button */}
                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
                    onClick={saveProfile}
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-8">
              <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Live Preview
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">
                  See how your profile will look to others
                </p>
              </div>

              <UserCard
                user={{
                  firstName,
                  lastName,
                  about,
                  age,
                  gender,
                  photoUrl,
                  skills: skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill.length > 0),
                }}
                showButtons={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Toast Notifications */}
        <div className="fixed top-8 right-8 z-50 space-y-4">
          {showToast && (
            <motion.div
              className="bg-green-600/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-xl border border-green-500/50 flex items-center gap-3"
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Check className="w-5 h-5" />
              <span className="font-medium">Profile updated successfully!</span>
            </motion.div>
          )}
          {error && (
            <motion.div
              className="bg-red-600/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-xl border border-red-500/50 flex items-center gap-3 max-w-md"
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
              {console.log(error)}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfile;
