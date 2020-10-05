import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';

// const handleChange = (value, setter) => {
//
// }

const emailRegex = /^\S+@\S+\.\S+$/;

const LoginPage = () => {
  const [emailError, setEmailError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (emailRegex.test(value)) {
      setEmail(value);
      setEmailError('');
    } else {
      setEmailError('Email not valid');
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log({ email, password });
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
            Forgot password? Then <Link to="/register">follow the link</Link>
          </span>
          <span>Need an account? <Link to="/register">Register...</Link></span>
        </div>
        <form className={`${styles.column} ${styles.login_column}`}>
          <span>Login into Eshka</span>
          <label>Email</label>
          <input placeholder="exmaple@email.com" onChange={handleEmailChange}/>
          {emailError && <label className={styles.error}>{emailError}</label>}
          <label>Password</label>
          <input type="password" onChange={event => setPassword(event.target.value)}/>
          <button onClick={handleSubmit}>Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
