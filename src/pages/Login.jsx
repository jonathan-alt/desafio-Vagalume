import { LoginForm } from '../components/forms/Login';
import styles from './styles.module.css';

export default function Login() {
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <LoginForm />
      </div>
    </div>
  );
}
