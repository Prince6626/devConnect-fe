import React from "react";
import { useState } from "react";
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

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 mt-8 mb-20 animate-fadeIn px-4">
      <div className="flex justify-center card-xl w-full lg:w-auto">
        <div className="card card-modern w-md max-w-md lg:max-w-xl xl:max-w-2xl shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center mb-5">Edit Profile</h2>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">First Name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">Last Name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">About</legend>
              <input
                type="text"
                className="input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">Age</legend>
              <input
                type="text"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">
                Profile Picture
              </legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">Gender</legend>
              <select
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="others">others</option>
              </select>
            </fieldset>
            <fieldset className="fieldset flex justify-center">
              <legend className="fieldset-legend ml-6.5">Skills</legend>
              <input
                type="text"
                className="input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
              />
            </fieldset>
            <div className="card-actions justify-center">
              <button
                className="btn btn-enhanced text-primary hover:text-neutral-content transition-all duration-300 transform hover:scale-105 focus:scale-95 mt-2"
                onClick={saveProfile}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 lg:mt-12 flex justify-center">
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
        />
      </div>
      <div className="toast toast-top toast-center fixed">
        {showToast && (
          <div className="alert alert-success">
            <span>Profile edited successfully</span>
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            {console.log(error)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
