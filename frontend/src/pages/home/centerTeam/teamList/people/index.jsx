import styles from './index.module.less';

const PeopleCom = ({ num, sum = 10 }) => {
  return (
    <div className={styles.progressBar}>
      {Array.from({ length: sum }).map((_, index) => (
        <div
          key={index}
          className={`${styles.block} ${index < num ? styles.active : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default PeopleCom;