import Logo from "./components/Logo";
import RegisterForm from "./components/RegisterForm";
import ShowcaseImage from "./components/ShowcaseImage";
import styles from "./index.module.less";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.reg_form}>
        <Logo />
        <RegisterForm />
      </div>
      <ShowcaseImage />
    </div>
  );
};

export default RegisterPage;
