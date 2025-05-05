import styles from "./index.module.less";
import classnames from 'classnames';
import { homeStore } from "@/domain/home/store/home.store";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import defaultImg from "@/assets/img/sports/default.png";
import profileLogo from "@/assets/img/profile_logo.png";
import PeopleCom from "./people";
import { useEffect,useState } from "react";


const TeamListCom = () => {
  const selectLocId = homeStore((state) => state.selectLocId);
  const getTeamList = homeStore((state) => state.getTeamList);
  const sports = homeStore((state) => state.sports);
  const selectIndex = homeStore((state) => state.selectIndex);
  const teamList = homeStore((state) => state.teamList);
  const activeCardId = homeStore((state) => state.activeCardId);
  const setActiveCardId = homeStore((state) => state.setActiveCardId);

  const [currentIndex, setCurrentIndex] = useState(0); // 当前显示的起始索引
  const [fadeClass, setFadeClass] = useState(""); // 控制淡入淡出的动画

  useEffect(() => {
    getTeamList()?.then(() => {
      setCurrentIndex(0); 
    })
  },[selectLocId])

  const handleLeftClick = () => {
    setFadeClass(styles.fadeOut); // 添加淡出动画
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 3 < 0 ? 0 : prevIndex - 3
      ); // 更新索引
      setFadeClass(styles.fadeIn); // 添加淡入动画
    }, 300); // 动画持续时间
  };

  const handleRightClick = () => {
    setFadeClass(styles.fadeOut); // 添加淡出动画
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= teamList.length ? prevIndex : prevIndex + 3
      ); // 更新索引
      setFadeClass(styles.fadeIn); // 添加淡入动画
    }, 300); // 动画持续时间
  };

  const handleCardClick = (id) => {
    setActiveCardId(id); // 设置当前选中的卡片 ID
  };

  return (
    <div className={styles.teamListContainer}>
    <div className={styles.header}>
      <div className={styles.title}>Team List</div>
      <div className={styles.navigation}>
        <LeftCircleOutlined className={styles.icon} onClick={handleLeftClick} />
        <RightCircleOutlined className={styles.icon} onClick={handleRightClick} />
      </div>
    </div>
    <div className={`${styles.teamCards} ${fadeClass}`}>
      {teamList.slice(currentIndex, currentIndex + 3).map((team) => (
        <div 
        className={classnames([styles.card_container, activeCardId === team._id ? styles.active : ''])} 
        key={team._id} 
        onClick={() => handleCardClick(team._id)} 
        >
          <div className={styles.card}>
            <img src={defaultImg} alt={team.sport} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <span className={styles.sportTag}>{sports?.[selectIndex]?.name ?? ""}</span>
              <p className={styles.address}>{team.name} : {team.team_desc}</p>
              <p className={styles.date}>{team.start_time} ~ {team.end_time}</p>
              <PeopleCom num={3} />
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
