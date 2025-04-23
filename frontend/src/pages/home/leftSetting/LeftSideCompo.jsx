import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const LeftSideCompo = () => {
  const [sports, setSports] = useState([]); // 用于存储运动列表
  const navigate = useNavigate(); // 用于导航

  // 调用后端接口获取运动列表
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get("/api/sport/list"); // 调用后端接口
        setSports(response.data.data); // 假设后端返回的数据在 data.data 中
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
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
