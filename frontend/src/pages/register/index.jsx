import Logo from "./components/Logo";
import RegisterForm from "./components/RegisterForm";
import ShowcaseImage from "./components/ShowcaseImage";
import "./index.less";

const RegisterPage = () => {
  return (
    <div className="register-container">
      <header className="register-header">
        <Logo />
      </header>

      <main className="register-main">
        <div className="form-wrapper">
          <RegisterForm />
        </div>

        <ShowcaseImage />
      </main>
    </div>
  );
};

export default RegisterPage;
