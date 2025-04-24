import LeftSetting from "./leftSetting/LeftSideCompo";
import RightProfile from "./rightProfile";
import "./index.less";

import { useEffect } from "react";
import { Button } from "antd";
import { userStore } from "@/domain/user/store/user.store";

const HomePage = () => {
  const setUserInfo = userStore((state) => state.setUserInfo);
  useEffect(() => {
    console.log("执行1次");
    setUserInfo();
  }, []);
  return (
    <div>
      <LeftSetting />
      <Button type="primary">test button</Button>
      <div className="right">
        <RightProfile />
      </div>
    </div>
  );
};
export default HomePage;
