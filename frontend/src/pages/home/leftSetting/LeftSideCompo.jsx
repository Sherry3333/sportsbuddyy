import React, { useEffect } from "react";
import { homeStore } from "@/domain/home/store/home.store";
import { useNavigate } from "react-router-dom";
import classnames from 'classnames';
import styles from "./index.module.less";
import { userStore } from "@/domain/user/store/user.store"; // Import userLogout method

const LeftSideCompo = () => {
  const sports = homeStore((state) => state.sports); 
  const selectIndex = homeStore((state) => state.selectIndex);
  const getSportsList = homeStore((state) => state.getSportsList); 
  const setSelectIndex = homeStore((state) => state.setSelectIndex);
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
        {sports.map((sport,index) => (
          <li key={sport._id} 
          onClick={() => setSelectIndex(index)}
          className={classnames(styles.sportItem, { [styles.active]: selectIndex === index })}>
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
