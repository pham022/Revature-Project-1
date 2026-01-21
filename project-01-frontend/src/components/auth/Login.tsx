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

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit = {onSubmitHandler}>
        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input className={styles.input} id = "username" value = {loginFormData.username} onChange = {onChangeHandler} name = 'username'/>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input className={styles.input} id = "password" value = {loginFormData.password} onChange = {onChangeHandler} name = 'password'/>
        </div>
        <div className={styles.field}>
          <button className={styles.button} type='submit'>Log In</button>
        </div>
        <div className={styles.field}>
          <Link to='/register'>Register an Account Here</Link>
        </div>
      </form>
    </div>

  )
}