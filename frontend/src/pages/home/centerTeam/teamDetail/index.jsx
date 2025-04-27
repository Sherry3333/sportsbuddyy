import styles from "./index.module.less";
import profileAvatar from "@/assets/img/profile_logo.png";
import { Button, Table, Avatar, Tag } from "antd";
const TeamDetailCom = () => {
  const teamMembers = [
    {
      key: "1",
      name: "Prashant Kumar Singh",
      gender: "Male",
      level: "LEVEL-4",
      info: "自我介绍"
    },
    {
      key: "2",
      name: "Ravi Kumar",
      gender: "Male",
      level: "LEVEL-4",
      info: "自我介绍"
    },
    {
      key: "3",
      name: "Ravi Kumar",
      gender: "Male",
      level: "LEVEL-4",
      info: "自我介绍"
    },
    {
      key: "4",
      name: "Ravi Kumar",
      gender: "Male",
      level: "LEVEL-4",
      info: "自我介绍"
    },
    {
      key: "5",
      name: "Ravi Kumar",
      gender: "Male",
      level: "LEVEL-5",
      info: "自我介绍"
    }
  ];

  const columns = [
    {
      title: "PLAYER",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className={styles.playerInfo}>
          <Avatar src={profileAvatar} alt="avatar" className={styles.avatar} />
          <div>
            <p className={styles.name}>{record.name}</p>
            <p className={styles.gender}>Gender: {record.gender}</p>
          </div>
        </div>
      )
    },
    {
      title: "LEVEL",
      dataIndex: "level",
      key: "level",
      render: (level) => <Tag color="purple">{level}</Tag>
    },
    {
      title: "INFO",
      dataIndex: "info",
      key: "info"
    },
    {
      title: "PROFILE",
      key: "profile",
      render: () => (
        <Button type="link" className={styles.detailsButton}>
          SHOW DETAILS
        </Button>
      )
    }
  ];
  return (
    <div className={styles.teamDetailContainer}>
      <div className={styles.header}>
        <h2>Team Detail</h2>
        <div className={styles.actions}>
          <Button type="primary" className={styles.commonButton}>
            join now
          </Button>
          <Button className={[styles.commonButton, styles.quitButton]}>quit</Button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <Table
          dataSource={teamMembers}
          columns={columns}
          pagination={false}
          className={styles.table}
          scroll={{y:'calc(100vh - 700px)'}}
        />
      </div>
    </div>
  );
};
export default TeamDetailCom;
