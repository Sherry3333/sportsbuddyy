import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/domain/user/store/user.store";
import axios from "axios"; // 导入 axios
import "./login.css";
import loginImage from "../../assets/img/login_img_rightside.jpeg";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      // 调用后端登录接口
      const response = await axios.post("/api/user/login", { email, password });

      // 假设后端返回用户信息
      const { data } = response;
      message.success("Login successful!");

      // 保存用户信息到 localStorage 或全局状态管理
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);

      // 跳转到主页
      navigate("/");
    } catch (error) {
      // 处理错误
      if (error.response && error.response.status === 401) {
        message.error("Invalid email or password");
      } else {
        message.error("An error occurred. Please try again later.");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const handleRegisterClick = () => {
    navigate("/register"); // 跳转到注册页面
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Sign in</h1>
        <p>Please login to continue to your account.</p>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Keep me logged in</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="sign-in-button">
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <div className="footer">
          <p>
            Need an account?{" "}
            <Button type="link" onClick={handleRegisterClick} className="register-button">
              Create one
            </Button>
          </p>
        </div>
      </div>
      <div className="login-image">
        <img src={loginImage} alt="Login" />
      </div>
    </div>
  );
};

export default LoginPage;
