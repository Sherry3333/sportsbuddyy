import React from "react";
import { Form, Input, Select, Button, message } from "antd";
import { registerUser } from "@/domain/register/repository/register.repository";
import { useRegisterStore } from "@/domain/register/store/register.store";
import { useNavigate } from "react-router-dom";
import "@/pages/register/index.less";

const { Option } = Select;

const RegisterForm = () => {
  const { loading, setLoading } = useRegisterStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await registerUser(values);
      message.success({
        content: "Registration successful!",
        duration: 1.5,
        onClose: () => {
          navigate("/login", { replace: true });
        }
      });
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.status === 400) {
        message.error("Username already exists, please try another one");
      } else {
        message.error("Registration failed, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="custom-form">
      <div className="form-header">
        <h2>Sign up</h2>
      </div>

      <Form.Item label="Name" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Select>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Sport" name="sports" rules={[{ required: true }]}>
        <Select>
          <Option value="tennis">Tennis</Option>
          <Option value="badminton">Badminton</Option>
          <Option value="football">Football</Option>
          <Option value="basketball">Basketball</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Level" name="level" rules={[{ required: true }]}>
        <Select>
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
          <Option value="pro">Pro</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="signup-btn" loading={loading}>
          Sign up
        </Button>
      </Form.Item>

      <p className="login-tip">
        Already have an account? <a onClick={() => navigate("/login")}>Sign in</a>
      </p>
    </Form>
  );
};

export default RegisterForm;
