import hh from '../assets/hh.svg';
import vector from '../assets/Vector.svg';
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}><img src={hh} alt="" />.FrontEnd</h1>
        <nav>
          <ul className={styles.nav}>
            <li><a href="">Вакансии FE</a></li>
            <li><img src={vector} alt="" /><a href="/">Обо мне</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
