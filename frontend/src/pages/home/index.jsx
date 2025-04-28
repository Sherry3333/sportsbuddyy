import LeftSetting from "./leftSetting/LeftSideCompo";
import RightProfile from "./rightProfile";
import CenterTeam from "./centerTeam";
import styles from "./index.module.less";

import { useEffect } from "react";
import { userStore } from "@/domain/user/store/user.store";

const HomePage = () => {
  const getUserInfo = userStore((state) => state.getUserInfo);
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className={styles.container}>
      <LeftSetting />
      <CenterTeam />
      <RightProfile />
    </div>
  );
};
export default HomePage;
