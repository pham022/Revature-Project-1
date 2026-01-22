<<<<<<< HEAD
import React, { useState, ChangeEvent } from "react";
import styles from './../Item.module.css';
import EmployeeItem from "../EmployeeItem";
import { Employee, RegisterFormData } from "../../types/Employee";
import { useAuth } from "./useAuth";
import { Link } from "react-router-dom";

export default function Register() {

    const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({username: '', password: '', isManager: false})

    const {register} = useAuth();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterFormData({
          ...registerFormData,
          [event.target.name]: event.target.value
        })
      }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(registerFormData);
        register(registerFormData.username, registerFormData.password, registerFormData.isManager);
    }

    function showHide() {
        var x = document.getElementById("password") as HTMLInputElement;
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('checked: ' + event.target.checked);
        setRegisterFormData({
            ...registerFormData,
            isManager: event.target.checked
        })
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit = {onSubmitHandler}>
                <div className={styles.field}>
                    <label className={styles.label}>Username</label>
                    <input className={styles.button} id = "username" value = {registerFormData.username} onChange = {onChangeHandler} name = 'username'/>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Password</label>
                    <input className={styles.button} type="password" id="password" value={registerFormData.password} onChange={onChangeHandler} name='password'/>
                    <button className={styles.button} type="button" onClick={showHide}>Show/Hide Password</button>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Check box if you are a manager.
                        <input type='checkbox' id='isManager' onChange={handleCheckbox} name='isManager'/>
                    </label>
                </div> 
                <div className={styles.field}>
                    <button className={styles.button} type='submit'>Register Employee</button>
                </div>
                <div className={styles.field}>
                    <Link to='/login'><center>Current Employees Log in here</center></Link>
                </div>
            </form>
        </div>
=======
import React from "react";

export default function Register() {

    return (
        <div>Register</div>
>>>>>>> 2617b9cd5ebd58518689d855ea6eee2707362f40
    )

}