import React, { useEffect } from "react";
import { homeStore } from "@/domain/home/store/home.store";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const LeftSideCompo = () => {
  const sports = homeStore((state) => state.sports); // 从 Zustand 中获取运动列表
  const getSportsList = homeStore((state) => state.getSportsList); // 获取运动列表的函数
  const navigate = useNavigate(); // 用于导航

  // 调用后端接口获取运动列表
  useEffect(() => {
    getSportsList()
  }, []);

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
      <div
        className={styles.logout}
        onClick={() => {
          localStorage.removeItem("userId"); // 清除用户 ID
          localStorage.removeItem("token"); // 清除 JWT Token
          navigate("/login"); // 跳转到登录页面
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default LeftSideCompo;
