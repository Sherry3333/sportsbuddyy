import styles from "./index.module.less";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import s1 from "@/assets/img/showcase1.jpg";
import s2 from "@/assets/img/showcase2.jpg";
import s3 from "@/assets/img/showcase3.jpg";
import profileLogo from "@/assets/img/profile_logo.png";
const TeamListCom = () => {
  const teams = [
    {
      id: 1,
      sport: "Badminton",
      address: "Address",
      date: "15 March 18:00 PM",
      teamName: "Team A",
      averageLevel: 3,
      image: s1
    },
    {
      id: 2,
      sport: "Basketball",
      address: "Address",
      date: "15 March 18:00 PM",
      teamName: "Team B",
      averageLevel: 3,
      image: s2
    },
    {
      id: 3,
      sport: "Tennis",
      address: "Address",
      date: "15 March 18:00 PM",
      teamName: "Team C",
      averageLevel: 3,
      image: s3
    }
  ];
  return (
    <div className={styles.teamListContainer}>
      <div className={styles.header}>
        <div className={styles.title}>Team List</div>
        <div className={styles.navigation}>
          <LeftCircleOutlined className={styles.icon} />
          <RightCircleOutlined className={styles.icon} />
        </div>
      </div>
      <div className={styles.teamCards}>
        {teams.map((team) => (
          <div className={styles.card_container}>
            <div key={team.id} className={styles.card}>
              <img src={team.image} alt={team.sport} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <span className={styles.sportTag}>{team.sport.toUpperCase()}</span>
                <p className={styles.address}>{team.address}</p>
                <p className={styles.date}>{team.date}</p>
                <div className={styles.teamInfo}>
                  <img src={profileLogo} alt="Team Avatar" className={styles.avatar} />
                  <div>
                    <p className={styles.teamName}>{team.teamName}</p>
                    <p className={styles.averageLevel}>Average Level: {team.averageLevel}</p>
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
