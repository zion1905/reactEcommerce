import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import { auth, db } from "../utils/fireBase";
import { ref, get, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            setProfileData({
              firstName: userData.name || "",
              email: userData.email || user.email,
              phone: userData.phone || "",
              address: userData.address || "",
            });
          } else {
            setProfileData({
              firstName: user.displayName || "",
              email: user.email || "",
              phone: "",
              address: "",
            });
          }
        } catch (error) {
          console.error("Error loading profile data:", error);
        }
      } else {
        // No user logged in
        setCurrentUser(null);
        setProfileData({
          firstName: "",
          email: "",
          phone: "",
          address: "",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = async () => {
    if (isEditing && currentUser) {
      try {
        await set(ref(db, `users/${currentUser.uid}`), {
          uid: currentUser.uid,
          name: profileData.firstName,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
        });
        alert(" Profile updated successfully!");
      } catch (error) {
        console.error("Error saving profile:", error);
        alert(" Failed to save profile.");
      }
    }

    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <label>Name</label>
        <input
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Email</label>
        <input
          name="email"
          value={profileData.email}
          disabled
        />

        <label>Phone</label>
        <input
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Address</label>
        <input
          name="address"
          value={profileData.address}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <button className="edit-btn" onClick={toggleEdit}>
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
