import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <div>
        <div>
          <span>Welcome back!</span>
          <span>To keep connected with us please login with your personal info</span>
          <span>Need an account?</span>
          <Link to="/register">Register...</Link>
        </div>
        <div>
          <span>Login into Eshka</span>
          <form>
            <label>Email</label>
            <input/>
            <label>Password</label>
            <input/>
            <button>Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;