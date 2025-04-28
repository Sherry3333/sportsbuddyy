import React from "react";
import DropDownCom from "./dropDown";
import TeamDetailCom from "./teamDetail";
import TeamListCom from "./teamList";

import { Card, Button, List, Avatar, Tag, Row, Col, Typography, Input } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

const { Title, Text } = Typography;

const CenterTeam = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_center}>
        <DropDownCom />
        <TeamListCom />
        <TeamDetailCom />
      </div>
    </div>
  );
};

export default CenterTeam;
