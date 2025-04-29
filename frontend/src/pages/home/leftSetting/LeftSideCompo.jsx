import React, { useEffect } from "react";
import { homeStore } from "@/domain/home/store/home.store";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import { userStore } from "@/domain/user/store/user.store"; // Import userLogout method

const LeftSideCompo = () => {
  const sports = homeStore((state) => state.sports); 
  const getSportsList = homeStore((state) => state.getSportsList); 
  const userLogout = userStore((state) => state.userLogout);
  const navigate = useNavigate(); 

  // Fetch sports list from the backend
  useEffect(() => {
    getSportsList();
  }, []);

  const handleLogout = () => {
    userLogout()
      .then((res) => {
        if (res.code === 200) {
          console.log("Logout successful:", res.message);
        } else {
          console.warn("Unexpected logout response:", res);
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error.message || error);
      })
      .finally(() => {
        // 无论成功或失败都跳转
        navigate("/login");
      });
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
