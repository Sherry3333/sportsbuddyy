import { useEffect } from "react";
import styles from "./index.module.less";
import { userStore } from "@/domain/user/store/user.store";
import { homeStore } from "@/domain/home/store/home.store";
import profileAvatar from "@/assets/img/profile_logo.png";
import { Button, Table, Avatar, Tag, message } from "antd";
const TeamDetailCom = () => {
  const teamList = homeStore((state) => state.teamList);
  const teamDetailUsersList = homeStore((state) => state.teamDetailUsersList);
  const getTeamUsersList = homeStore((state) => state.getTeamUsersList);
  const activeCardId = homeStore((state) => state.activeCardId);
  const myTeamList = userStore((state) => state.userTeams);
  const quitTeam = homeStore((state) => state.quitTeam);
  const joinTeam = homeStore((state) => state.joinTeam);
  const getMyTeamList = userStore((state) => state.getMyTeamList);
  const onJoinTeam = () => {
    joinTeam(activeCardId)?.then((res) => {
      getTeamUsersList();
      getMyTeamList();
      message.success(res?.message ?? "join success!");
    });
  };

  const onQuitTeam = () => {
    quitTeam(activeCardId)?.then((res) => {
      getTeamUsersList();
       getMyTeamList();
        message.success(res?.message ?? "quit success!");
    });
  };
  const columns = [
    {
      title: "PLAYER",
      dataIndex: "username",
      key: "username",
      render: (text, record) => {
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
          <div style={{ marginBottom: "5px" }}>
            <Tag color="purple">email:{text ?? "~"}</Tag>
          </div>
          <Tag>sports:{record?.sports ?? "~"}</Tag>
        </>
      )
    }
  ];

  useEffect(() => {
    getTeamUsersList();
  }, [activeCardId]);

  const getIsJoined = () => {
    const flag = myTeamList?.some((item) => item?.id === activeCardId);
    console.log("res:",flag)
    return flag;
  };

  return (
    <div className={styles.teamDetailContainer}>
      <div className={styles.header}>
        <h2>Team Detail</h2>
        {teamList?.length > 0 && activeCardId && (
          <div className={styles.actions}>
            {!getIsJoined() && (
              <Button type="primary" onClick={onJoinTeam} className={styles.commonButton}>
                join now
              </Button>
            )}
            {getIsJoined() && (
              <Button onClick={onQuitTeam} className={[styles.commonButton, styles.quitButton]}>
                quit
              </Button>
            )}
          </div>
        )}
      </div>
      <div className={styles.tableContainer}>
        <Table
          dataSource={teamDetailUsersList}
          columns={columns}
          pagination={false}
          className={styles.table}
        />
      </div>
    </div>
  );
};
export default TeamDetailCom;
