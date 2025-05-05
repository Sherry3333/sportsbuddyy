import React, { useEffect } from "react";
import {message} from "antd";
import { homeStore } from "@/domain/home/store/home.store";
import { useNavigate } from "react-router-dom";
import classnames from 'classnames';
import styles from "./index.module.less";
import { removeStorage } from "@/utils/helper";
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
        removeStorage("token");
        message.success(res?.message ?? "Logout success!");
        navigate("/login"); // Redirect to login page
      })
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
