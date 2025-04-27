import { useState } from "react";
import { AutoComplete, Button } from "antd";
import mapLogo from "@/assets/img/map.png"
import styles from "./index.module.less";
const DropDownCom = () => {
  const [options, setOptions] = useState([]);
  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const createTeam = () => {
    console.log("create team");
  };
  return (
    <div className={styles.center}>
      <img src={mapLogo} alt="map" className={styles.map_logo} />
      <AutoComplete className={styles.auto_complete} placeholder="click to choose address" options={options} onSelect={onSelect} />
      <Button type="primary" className={styles.create_team_button} onClick={createTeam}>
        create team
      </Button>
    </div>
  );
};
export default DropDownCom;
