import React, { ChangeEventHandler, useState, useContext } from 'react'
import { AuthContext, Employee, LoginFormData } from '../../types/Employee';
import styles from './../Item.module.css';
import { useAuth } from './useAuth';

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
    <div>
      <form onSubmit = {onSubmitHandler}>
        <div>
          <label>Username</label>
          <input id = "username" value = {loginFormData.username} onChange = {onChangeHandler} name = 'username'/>
        </div>
        <div>
          <label>Password</label>
          <input id = "password" value = {loginFormData.password} onChange = {onChangeHandler} name = 'password'/>
        </div>
        <div>
          <button type='submit'>Log In</button>
        </div>
      </form>
    </div>

  )
}