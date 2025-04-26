import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/domain/user/store/user.store";
import "./login.css";
import loginImage from "../../assets/img/login_img_rightside.jpeg";

const LoginPage = () => {
  const userLogin = userStore((state) => state.userLogin);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;
    
    userLogin({email,password}).then((res) => {
      message.success(res.message);
      window.location.href = "/";
    });
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
