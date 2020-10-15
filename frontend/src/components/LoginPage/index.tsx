import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRoutine } from '../../sagas/auth/routines';
import { IAppState} from '../../models/appState';
import styles from './styles.module.sass';
import inputs from '../styles/inputs.module.sass';

export interface ILoginProps {
  id?: string;
  isLoading: boolean;
  login(loginData: any): void;
}

const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

const LoginPage: React.FC<ILoginProps> = ({ id, isLoading, login }) => {
  const [usernameError, setUsernameError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (usernameRegex.test(value)) {
      setUsername(value);
      setUsernameError('');
    } else {
      setUsernameError('Username not valid');
    }
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log({ email: username, password });
    login({ username, password });
  };

  return (
    <div className={styles.login_page_wrapper}>
      <div className={styles.login_page}>
        <div className={`${styles.column} ${styles.additional_info}`}>
          <span className={styles.title}>Welcome back!</span>
          <span className={styles.text}>
            To keep connected with us please login with your personal info
          </span>
          <span>
            Forgot password? Then <Link to="/register" className={styles.link}>follow the link</Link>
          </span>
          <span>Need an account? <Link to="/register" className={styles.link}>Register...</Link></span>
        </div>
        <form className={`${styles.column} ${styles.login_column}`}>
          <span>Login into Eshka</span>
          <label>Email</label>
          <input className={inputs.input_standard} placeholder="cap_map"
                 onChange={handleUsernameChange}
          />
          {usernameError && <label className={styles.error}>{usernameError}</label>}
          <label>Password</label>
          <input className={inputs.input_standard} type="password"
                 onChange={event => setPassword(event.target.value)}
          />
          <button onClick={handleLogin}>Sign in</button>
          {isLoading && <span>Loading...</span>}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (appState: IAppState) => ({
  id: appState.auth?.user?.id,
  isLoading: appState.auth?.isLoading
});

const mapDispatchToProps = {
  login: loginRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);