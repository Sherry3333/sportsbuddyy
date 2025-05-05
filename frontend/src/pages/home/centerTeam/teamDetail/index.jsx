import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { homeStore } from "@/domain/home/store/home.store";
import profileAvatar from "@/assets/img/profile_logo.png";
import { Button, Table, Avatar, Tag, message } from "antd";
const TeamDetailCom = () => {
  const teamList = homeStore((state) => state.teamList);
  const getTeamUsersList = homeStore((state) => state.getTeamUsersList);
  const activeCardId = homeStore((state) => state.activeCardId);
  const quitTeam = homeStore((state) => state.quitTeam);
  const joinTeam = homeStore((state) => state.joinTeam);
  const [teamMembers, setTeamMembers] = useState([]);
  const onJoinTeam = () => {
    joinTeam(activeCardId)?.then((res) => {
      if (res?.code === 200) {
        message.success(res?.message ?? "join success!");
      }
    });
  };

  const onQuitTeam = () => {
    quitTeam(activeCardId)?.then((res) => {
      if (res?.code === 200) {
        message.success(res?.message ?? "quit success!");
      }
    });
  };
  const columns = [
    {
      title: "PLAYER",
      dataIndex: "username",
      key: "username",
      render: (text, record) => {
        console.log("record:", record);
        return (
          <div className={styles.playerInfo}>
            <Avatar src={profileAvatar} alt="avatar" className={styles.avatar} />
            <div>
              <p className={styles.name}>{record?.username ?? "~"}</p>
              <p className={styles.gender}>Gender: {record?.gender ?? "~"}</p>
            </div>
          </div>
        );
      }
    },
    {
      title: "LEVEL",
      dataIndex: "level",
      key: "level",
      render: (level) => {
        return <Tag color="purple">{level ?? "~"}</Tag>;
      }
    },
    {
      title: "PROFILE",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <>
          <div style={{marginBottom:"5px"}}><Tag color="purple">email:{text ?? "~"}</Tag></div>
          <Tag>sports:{record?.sports ?? "~"}</Tag>
        </>
      )
    }
  ];

  useEffect(() => {
    getTeamUsersList()?.then((res) => {
      console.log("res:", res);
      setTeamMembers(res?.data?.members ?? []);
    });
  }, [activeCardId]);
  return (
    <div className={styles.teamDetailContainer}>
      <div className={styles.header}>
        <h2>Team Detail</h2>
        {teamList?.length > 0 && (
          <div className={styles.actions}>
            <Button type="primary" onClick={onJoinTeam} className={styles.commonButton}>
              join now
            </Button>
            <Button onClick={onQuitTeam} className={[styles.commonButton, styles.quitButton]}>
              quit
            </Button>
          </div>
        )}
      </div>
      <div className={styles.tableContainer}>
        <Table
          dataSource={teamMembers}
          columns={columns}
          pagination={false}
          className={styles.table}
          scroll={{ y: "calc(100vh - 700px)" }}
        />
      </div>
    </div>
  );
};
export default TeamDetailCom;
