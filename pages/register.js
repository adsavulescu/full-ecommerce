import React, { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';

const register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async event => {
        event.preventDefault();

        const res = await fetch('/api/register', {
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const result = await res.json();
        // result.user => 'Ada Lovelace'
    };

    return (
        <Container>
            <h2>Register</h2>

            <div>
                <Form onSubmit={registerUser}>
                    <Form.Group className="mb-3" controlId="formBasicUser">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Keep me logged in" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create account
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default register;

