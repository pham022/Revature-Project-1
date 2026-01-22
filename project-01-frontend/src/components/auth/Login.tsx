import React, { ChangeEventHandler, useState, useContext } from 'react'
import { AuthContext, Employee, LoginFormData } from '../../types/Employee';
import styles from './../Item.module.css';
import { useAuth } from './useAuth';
import { Link } from 'react-router-dom';

export default function Login() {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({ username: '', password: '' });

  const {login} = useAuth();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginFormData);
    login(loginFormData.username, loginFormData.password);
  }

  function showHide() {
    var x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit = {onSubmitHandler}>
        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input className={styles.button} id = "username" value = {loginFormData.username} onChange = {onChangeHandler} name = 'username'/>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input className={styles.button} type="password" id="password" value={loginFormData.password} onChange={onChangeHandler} name='password'/>
          <button className={styles.button} type="button" onClick={showHide}>Show/Hide Password</button>
        </div>
        <div className={styles.field}>
          <button className={styles.button} type='submit'>Log In</button>
        </div>
        <div className={styles.field}>
          <Link to='/register'><center>Register a new Employee Account here</center></Link>
        </div>
      </form>
    </div>

  )
}
