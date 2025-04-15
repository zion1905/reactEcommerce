import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        firstName: user.firstName,
        email: user.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      localStorage.setItem("currentUser", JSON.stringify(profileData));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-card">
      <h2>Profile</h2>
      <label>Name</label>
      <input name="firstName" value={profileData.firstName} onChange={handleChange} disabled={!isEditing} />

      <label>Email</label>
      <input name="email" value={profileData.email} disabled />

      <label>Phone</label>
      <input name="phone" value={profileData.phone} onChange={handleChange} disabled={!isEditing} />

      <label>Address</label>
      <input name="address" value={profileData.address} onChange={handleChange} disabled={!isEditing} />

      <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit Profile"}</button>
    </div>
  );
};

export default Profile;
