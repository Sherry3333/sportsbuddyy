import React from "react";
import { homeStore } from "@/domain/home/store/home.store";
import { Modal, message, Input, Select, DatePicker, Button, InputNumber, Form } from "antd";
import styles from "./index.module.less";

const { RangePicker } = DatePicker;

const CreateTeamModal = () => {
  const locList = homeStore((state) => state.locList);
  const setModalState = homeStore((state) => state.setModalState);
  const isModalOpen = homeStore((state) => state.isModalOpen);
  const createTeam = homeStore((state) => state.createTeam);

  const handleCancel = () => {
    setModalState(false);
  };

  const handleCreate = (values) => {
    createTeam({
      name: values.teamName,
      loc_id: values.gymLocation,
      start_time: values.startDate[0].format("YYYY-MM-DD HH:mm"),
      end_time: values.startDate[1].format("YYYY-MM-DD HH:mm"),
      level: values.teamLevel,
      team_desc: values.teamDescription,
      total_num: values.teamSize
    }).then((res) => {
      message.success(res?.message ?? "Create team successfully");
      setModalState(false);
    });
  };

  const getArrayLevel = (num) => {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push({ value: `Level ${i}`, label: `Level ${i}` });
    }
    return arr;
  };

  return (
    <div>
      <Modal
        title="Create Team"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Custom footer buttons
        className={styles.modal}
        width={600}
      >
        <Form
          layout="vertical"
          onFinish={handleCreate} // Trigger on form submission
          className={styles.form}
          initialValues={{
            teamSize: 10,
            teamLevel: "Level 3"
          }}
        >
          {/* First row: Team Name and Team Description */}
          <div className={styles.row}>
            <Form.Item
              name="teamName"
              label="Team Name"
              rules={[{ required: true, message: "Please enter the team name!" }]}
              className={styles.field}
            >
              <Input placeholder="New Name" />
            </Form.Item>
            <Form.Item
              name="teamDescription"
              label="Team Description"
              rules={[{ required: true, message: "Please enter the team description!" }]}
              className={styles.field}
            >
              <Input placeholder="Input team information" />
            </Form.Item>
          </div>

          {/* Second row: Select Sport, Team Size, Team Level, Gym Location */}
          <div className={styles.row}>
            <Form.Item
              name="teamSize"
              label="Team Size"
              rules={[{ required: true, message: "Please enter the team size!" }]}
              className={styles.field}
            >
              <InputNumber
                style={{ width: "150px" }}
                min={1}
                max={10}
                placeholder="Enter team size"
              />
            </Form.Item>
            <Form.Item
              name="teamLevel"
              label="Team Level"
              rules={[{ required: true, message: "Please select a team level!" }]}
              className={styles.field}
            >
              <Select placeholder="Select a level" options={getArrayLevel(5)} />
            </Form.Item>
            <Form.Item
              name="gymLocation"
              label="Gym Location"
              rules={[{ required: true, message: "Please enter the gym location!" }]}
              className={styles.field}
            >
              <Select placeholder="Select a location" options={locList} />
            </Form.Item>
          </div>

          {/* Third row: Start Date and End Date */}
          <div className={styles.row}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: "Please select the start date!" }]}
              className={styles.field}
            >
              <RangePicker placeholder="Select start date" format="YYYY-MM-DD HH:mm" showTime />
            </Form.Item>
          </div>

          {/* Bottom buttons */}
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
