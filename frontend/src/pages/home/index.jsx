import LeftSetting from "./leftSetting/LeftSideCompo";
import RightProfile from "./rightProfile";
import CenterTeam from "./centerTeam";
import styles from "./index.module.less";

const HomePage = () => {  
  return (
    <div className={styles.container}>
      <LeftSetting />
      <CenterTeam />
      <RightProfile />
    </div>
  );
};
export default HomePage;
