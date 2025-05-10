import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import tennis from "@/assets/img/tennis.png";
import football from "@/assets/img/football.png";
import badminton from "@/assets/img/badminton.png";
import basketball from "@/assets/img/basketball.png";
import sports from "@/assets/img/sports.png";
import { userStore } from "@/domain/user/store/user.store";

const getSportIcon = (teamName) => {
  const name = teamName.toLowerCase();
  if (name.includes("tennis")) return tennis;
  if (name.includes("football") || name.includes("soccer")) return football;
  if (name.includes("badminton")) return badminton;
  if (name.includes("basketball")) return basketball;
  return sports; // default icon
};

const Profile = () => {
  const userTeams = userStore((state) => state.userTeams);
  const getMyTeamList = userStore((state) => state.getMyTeamList);
  const getUserInfo = userStore((state) => state.getUserInfo);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchUserData();
    getMyTeamList();
  }, []);

  const fetchUserData = () => {
    getUserInfo()
      .then((res) => {
        const user = res.data;
        setUsername(user.username);
      })
  };

  const getAvatarUrl = (username) => {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(username || "default")}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Profile</div>
      </div>

      <div className={styles.info}>
        <div className={styles.avatarWrapper}>
          <img
            src={username ? getAvatarUrl(username) : getAvatarUrl("default")}
            alt="avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.userName}>{username || "Guest"}</div>
        <div className={styles.sportIcons}>
          <img src={sports} alt="sports" />
          <img src={badminton} alt="badminton" />
          <img src={tennis} alt="tennis" />
          <img src={basketball} alt="basketball" />
          <img src={football} alt="football" />
        </div>
      </div>

      <div className={styles.teamsSection}>
        <div className={styles.sectionTitle}>Your Team</div>
        <div className={styles.teamsList}>
          {userTeams.length > 0 ? (
            userTeams.map((team) => (
              <div key={team.id} className={styles.teamItem}>
                <div className={styles.teamInfo}>
                  <img src={getSportIcon(team.name)} alt="team" className={styles.teamAvatar} />
                  <div className={styles.teamDetails}>
                    <div className={styles.teamName}>{team.name}</div>
                    <div className={styles.teamAddress}>{team.time}</div>
                  </div>
                </div>
                {/* <button className={styles.detailBtn}>Detail</button> */}
              </div>
            ))
          ) : (
            <div className={styles.noTeamsMessage}>
              <div className={styles.statusText}>You haven't joined any team yet</div>
              <button className={styles.findBtn}>Find buddies</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
