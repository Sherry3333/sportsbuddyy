import styles from "./index.module.less";
import classnames from "classnames";
import { getImage } from "@/utils/imageMap";
import { homeStore } from "@/domain/home/store/home.store";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import showcase1 from "@/assets/img/showcase4.jpg";
import profileLogo from "@/assets/img/profile_logo.png";
import PeopleCom from "./people";
import { useEffect, useState } from "react";

const TeamListCom = () => {
  const selectLocId = homeStore((state) => state.selectLocId);
  const getTeamList = homeStore((state) => state.getTeamList);
  const sports = homeStore((state) => state.sports);
  const selectIndex = homeStore((state) => state.selectIndex);
  const teamList = homeStore((state) => state.teamList);
  const activeCardId = homeStore((state) => state.activeCardId);
  const setActiveCardId = homeStore((state) => state.setActiveCardId);

  const [currentIndex, setCurrentIndex] = useState(0); // Current starting index
  const [fadeClass, setFadeClass] = useState(""); // Control fade animation

  useEffect(() => {
    getTeamList()?.then(() => {
      setCurrentIndex(0);
      setActiveCardId(null);// Reset active card ID
    });
  }, [selectLocId]);

  const handleLeftClick = () => {
    if(currentIndex <= 0) return;
    const newIndex = currentIndex - 3;
    if(newIndex < 0) return;
    setFadeClass(styles.fadeOut); // Add fade out animation
    setTimeout(() => {
      setCurrentIndex(newIndex); // Update index
      setFadeClass(styles.fadeIn); // Add fade in animation
    }, 300); // Animation duration
  };

  const handleRightClick = () => {
    const newIndex = currentIndex + 3;
    if(newIndex >= teamList.length) return;
    setFadeClass(styles.fadeOut); // Add fade out animation
    setTimeout(() => {
      setCurrentIndex(newIndex); // Update index
      setFadeClass(styles.fadeIn); // Add fade in animation
    }, 300); // Animation duration
  };

  const handleCardClick = (id) => {
    setActiveCardId(id); // Set current selected card ID
  };

  const sportName = sports?.[selectIndex]?.name ?? "";

  const sliceTeamList = teamList.slice(currentIndex, currentIndex + 3);
  return (
    <div className={classnames([styles.teamListContainer])}>
      <div className={styles.header}>
        <div className={styles.title}>Team List</div>
        <div className={styles.navigation}>
          <LeftCircleOutlined className={styles.icon} onClick={handleLeftClick} />
          <RightCircleOutlined className={styles.icon} onClick={handleRightClick} />
        </div>
      </div>
      <div className={`${styles.teamCards} ${styles.clearfix} ${fadeClass} ${sliceTeamList.length === 2 ? styles.two_card : styles.three_card}`}>
        {sliceTeamList.map((team) => (
          <div
            className={classnames([
              styles.card_container,
              activeCardId === team._id ? styles.active : ""
            ])}
            key={team._id}
            onClick={() => handleCardClick(team._id)}
          >
            <div className={styles.card}>
              <img src={getImage(sportName)} alt={team.sport} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <span className={styles.sportTag}>{sportName}</span>
                <p className={styles.address}>
                  {team.name} : {team.team_desc}
                </p>
                <p className={styles.date}>
                  {team.start_time} ~ {team.end_time}
                </p>
                <PeopleCom num={team?.current_num ?? 0} sum={team?.total_num ?? 10} />
                <div className={styles.teamInfo}>
                  <img src={profileLogo} alt="Team Avatar" className={styles.avatar} />
                  <div>
                    <p className={styles.teamName}>{team.teamName}</p>
                    <p className={styles.averageLevel}>Average Level: {team.level}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeamListCom;
