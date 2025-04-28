import { useState } from "react";
import { AutoComplete, Button, Select} from "antd";
import mapLogo from "@/assets/img/map.png"
import styles from "./index.module.less";
const DropDownCom = () => {
  const [options, setOptions] = useState([]);
  
  const handleChange = (value) => {
    console.log('value:',value)
  }

  const createTeam = () => {
    console.log("create team");
  };
  return (
    <div className={styles.center}>
      <img src={mapLogo} alt="map" className={styles.map_logo} />
      <Select
          size="large"
          defaultValue="a1"
          onChange={handleChange}
          style={{ width: 200, marginRight:20 }}
          options={options}
        />
      <Button type="primary" className={styles.create_team_button} onClick={createTeam}>
        create team
      </Button>
    </div>
  );
};
export default DropDownCom;
