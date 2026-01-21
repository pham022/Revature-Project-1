import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, Employee } from "../types/Employee";
import base_url from "../util/url";
import axios from "axios";

export default function EmployeeItem() {

    const params = useParams();
    const id = params.id;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${base_url}/employees/${id}`)
        .then(response => setEmployee(response.data))
        .catch(error => console.error(error))
    }, [id])

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(!employee) return;
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        })
    }

    const onUpdateHandler = () => {
        axios.put(`${base_url}/employees`, employee)
        .then(response => {
            alert("Update was successful.");
            navigate('/');
        })
        .catch(error => console.error(error));
    }



}