import React from 'react';
import { homeStore } from '@/domain/home/store/home.store';

import { Modal, Input, Select, DatePicker, Button,InputNumber,Form } from 'antd';
import {  EnvironmentOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const {RangePicker} = DatePicker;

const CreateTeamModal = () => {
  const locList = homeStore((state) => state.locList);
  const setModalState = homeStore((state) => state.setModalState);
  const isModalOpen = homeStore((state) => state.isModalOpen);
  const showModal = () => {
    setModalState(true);
  };

  const handleCancel = () => {
    setModalState(false);
  };

  const handleCreate = (values) => {

    console.log('values:',values)
    setModalState(false);
  };

  const getArrayLevel = (num) => {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push({value: `Level ${i}`, label: `Level ${i}`});
    }
    return arr;
  }

  return (
    <div>
      {/* 触发弹框的按钮 */}
      <Button type="primary" onClick={showModal}>
        Open Create Team Modal
      </Button>

      <Modal
        title="Create Team"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // 自定义底部按钮
        className={styles.modal}
        width={600}
      >
        <Form
          layout="vertical"
          onFinish={handleCreate} // 提交表单时触发
          className={styles.form}
        >
          {/* 第一行：Team Name 和 Team Description */}
          <div className={styles.row}>
            <Form.Item
              name="teamName"
              label="Team Name"
              rules={[{ required: true, message: 'Please enter the team name!' }]}
              className={styles.field}
            >
              <Input placeholder="New Name" />
            </Form.Item>
            <Form.Item
              name="teamDescription"
              label="Team Description"
              rules={[{ required: true, message: 'Please enter the team description!' }]}
              className={styles.field}
            >
              <Input placeholder="Input team information" />
            </Form.Item>
          </div>

          {/* 第二行：Select Sport, Team Size, Team Level, Gym Location */}
          <div className={styles.row}>
            <Form.Item
              name="teamSize"
              label="Team Size"
              rules={[{ required: true, message: 'Please enter the team size!' }]}
              className={styles.field}
            >
              <InputNumber style={{width: '150px'}} defaultValue={10} min={1} max={10} placeholder="Enter team size" />
            </Form.Item>
            <Form.Item
              name="teamLevel"
              label="Team Level"
              rules={[{ required: true, message: 'Please select a team level!' }]}
              className={styles.field}
            >
              <Select
                placeholder="Select a level"
                options={getArrayLevel(5)}
                defaultValue="Level 3"
              />
            </Form.Item>
            <Form.Item
              name="gymLocation"
              label="Gym Location"
              rules={[{ required: true, message: 'Please enter the gym location!' }]}
              className={styles.field}
            >
               <Select
                placeholder="Select a location"
                options={locList}
              />
            </Form.Item>
          </div>

          {/* 第三行：Start Date 和 End Date */}
          <div className={styles.row}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: 'Please select the start date!' }]}
              className={styles.field}
            >
              <RangePicker placeholder="Select start date" showTime/>
            </Form.Item>
          </div>

          {/* 底部按钮 */}
          <div className={styles.footer}>
            <Button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" className={styles.createButton} htmlType="submit">
              Create Team
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTeamModal;