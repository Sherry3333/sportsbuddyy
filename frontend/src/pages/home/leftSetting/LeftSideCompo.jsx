import React, { useEffect } from "react";
import { homeStore } from "@/domain/home/store/home.store";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests
import { removeStorage } from "@/utils/helper"; // Import removeStorage method
import styles from "./index.module.less";

const LeftSideCompo = () => {
  const sports = homeStore((state) => state.sports); // Retrieve sports list from Zustand store
  const getSportsList = homeStore((state) => state.getSportsList); // Function to fetch sports list
  const navigate = useNavigate(); // Used for navigation

  // Fetch sports list from the backend
  useEffect(() => {
    getSportsList();
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const response = await axios.post("/api/user/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        },
      });

      if (response.status === 200) {
        console.log(response.data.message); // "Logout successful"
        // Clear user information from local storage using removeStorage
        removeStorage("userId");
        removeStorage("token");
        // Redirect to the login page
        navigate("/login");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      // Optionally redirect to login even if logout fails
      navigate("/login");
    }
  };

  return (
    <div className={styles.leftSide}>
      <h2 className={styles.title}>SPORTS BUDDY</h2>
      <ul className={styles.sportList}>
        {sports.map((sport) => (
          <li key={sport._id} className={styles.sportItem}>
            {sport.name}
          </li>
        ))}
      </ul>
      <div className={styles.logout} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default LeftSideCompo;
