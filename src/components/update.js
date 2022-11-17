import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Update() {
    let history = useHistory();
    const [Id, setID] = useState(null);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('Id'))
        setFirstName(localStorage.getItem('FirstName'));
        setLastName(localStorage.getItem('LastName'));
        setEmail(localStorage.getItem('Email'));
    }, []);

    const updateAPIData = () => {
        axios.put(`${process.env.REACT_APP_ENDPOINT}/crud/student?id=${Id}`, {
            Id,
            FirstName,
            LastName,
            Email
        }).then(() => {
            history.push('/read')
        })
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={LastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
