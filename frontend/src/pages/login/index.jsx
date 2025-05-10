import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/domain/user/store/user.store";
import styles from "./login.module.less";
import loginImage from "../../assets/img/login_img_rightside.jpeg";

const LoginPage = () => {
  const userLogin = userStore((state) => state.userLogin);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;

    userLogin({ email, password }).then((res) => {
      message.success(res.message);
      window.location.href = "/";
    });
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to registration page
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-form"]}>
        <div className={styles.form_container}>
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
              <Input style={{height:40}} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password style={{height:40}} placeholder="Enter your password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Keep me logged in</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.footer}>
            <p>
              Need an account?{" "}
              <Button
                type="link"
                onClick={handleRegisterClick}
                className={styles["register-button"]}
              >
                Create one
              </Button>
            </p>
          </div>
        </div>
      </div>
      <div className={styles["login-image"]}>
        <img src={loginImage} alt="Login" />
      </div>
    </div>
  );
};

export default LoginPage;
