import React, { useState, useRef, useEffect } from "react";
import "./index.less";
import axios from "axios";
import tennis from "@/assets/img/tennis.png";
import football from "@/assets/img/football.png";
import badminton from "@/assets/img/badminton.png";
import basketball from "@/assets/img/basketball.png";
import sports from "@/assets/img/sports.png";

const getSportIcon = (teamName) => {
  const name = teamName.toLowerCase();
  if (name.includes("tennis")) return tennis;
  if (name.includes("football") || name.includes("soccer")) return football;
  if (name.includes("badminton")) return badminton;
  if (name.includes("basketball")) return basketball;
  return sports; // 默认图标
};

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userTeams, setUserTeams] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUserData();
    fetchUserTeams();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUserTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/team/myteams", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        setUserTeams(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user teams:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      // 从 token 中获取用户 ID
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const { userId } = JSON.parse(jsonPayload);

      // 使用已有的 API 获取用户信息
      const response = await axios.get(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        setUserData(response.data);
      } else {
        console.error("Failed to fetch user data");
        // 如果获取失败，清除 token 并跳转到登录页
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    setIsDropdownOpen(false);
  };

  const getAvatarUrl = (username) => {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(username || "default")}`;
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">Profile</div>
        <div className="dropdown-container" ref={dropdownRef}>
          {!isDropdownOpen ? (
            <button className="more-btn" onClick={() => setIsDropdownOpen(true)}>
              ⋮
            </button>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="profile-info">
        <div className="avatar-wrapper">
          <img
            src={userData ? getAvatarUrl(userData.username) : getAvatarUrl("default")}
            alt="avatar"
            className="avatar"
          />
        </div>
        <div className="user-name">{userData ? userData.username : "Guest"}</div>
        <div className="sport-icons">
          <img src={sports} alt="sports" />
          <img src={badminton} alt="badminton" />
          <img src={tennis} alt="tennis" />
          <img src={basketball} alt="basketball" />
          <img src={football} alt="football" />
        </div>
      </div>

      <div className="teams-section">
        <div className="section-title">Your Team</div>
        <div className="teams-list">
          {userTeams.length > 0 ? (
            userTeams.map((team) => (
              <div key={team.id} className="team-item">
                <div className="team-info">
                  <img src={getSportIcon(team.name)} alt="team" className="team-avatar" />
                  <div className="team-details">
                    <div className="team-name">{team.name}</div>
                    <div className="team-address">{team.time}</div>
                  </div>
                </div>
                <button className="detail-btn">Detail</button>
              </div>
            ))
          ) : (
            <div className="no-teams-message">
              <div className="status-text">You haven't joined any team yet</div>
              <button className="find-btn">Find buddies</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
