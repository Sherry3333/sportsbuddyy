import React, { useState } from 'react';
import { Modal, Input, Select, DatePicker, Button } from 'antd';
import { PlusOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { Option } = Select;

const CreateTeamModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = () => {
    // 处理创建逻辑
    console.log('Team Created');
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* 触发弹框的按钮 */}
      <Button type="primary" onClick={showModal}>
        Open Create Team Modal
      </Button>

      {/* 弹框 */}
      <Modal
        title="Create Team"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // 自定义底部按钮
        className={styles.modal}
      >
        <div className={styles.form}>
          {/* 第一行：Team Name 和 Team Description */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Team Name</label>
              <Input placeholder="New Name" />
            </div>
            <div className={styles.field}>
              <label>Team Description</label>
              <Input placeholder="Input team information" />
            </div>
          </div>

          {/* 第二行：Select Sport, Team Size, Team Level, Gym Location */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Select Sport</label>
              <Select defaultValue="tennis">
                <Option value="tennis">Tennis</Option>
                <Option value="basketball">Basketball</Option>
                <Option value="badminton">Badminton</Option>
              </Select>
            </div>
            <div className={styles.field}>
              <label>Team Size</label>
              <Input placeholder="6" />
            </div>
            <div className={styles.field}>
              <label>Team Level</label>
              <Input placeholder="Level-4" suffix={<span className={styles.levelDot}></span>} />
            </div>
            <div className={styles.field}>
              <label>Gym Location</label>
              <Input placeholder="Auckland Gym" suffix={<EnvironmentOutlined />} />
            </div>
          </div>

          {/* 第三行：Start Date 和 End Date */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Start Date</label>
              <DatePicker placeholder="12. March 2025" />
            </div>
            <div className={styles.field}>
              <label>End Date</label>
              <DatePicker placeholder="18. March 2025" />
            </div>
          </div>

          {/* 第四行：添加成员 */}
          <div className={styles.row}>
            <Button icon={<PlusOutlined />} className={styles.addMemberButton}>
              Add Member
            </Button>
          </div>

          {/* 底部按钮 */}
          <div className={styles.footer}>
            <Button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" className={styles.createButton} onClick={handleCreate}>
              Create Team
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTeamModal;