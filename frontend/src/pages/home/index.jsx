import LeftSetting from "./leftSetting";
import { useEffect } from "react";
import { Button } from "antd";
import { userStore } from "@/domain/user/store/user.store";
const HomePage = () => {
  const setUserInfo = userStore(state => state.setUserInfo);
  useEffect(() => {
    console.log('执行1次')
    setUserInfo();
  },[])
  return(
    <div >
      <LeftSetting/>
      <Button type="primary">test button</Button>
    </div>
    
  )
}
export default HomePage;