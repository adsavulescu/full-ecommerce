import React, {useContext, useState} from "react";
import {Container, Form, Button} from "react-bootstrap";
import { UserContext } from "@/context/UserContext";
import {useRouter} from "next/router";
const Login = () => {
    const router = useRouter();
    const { saveUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log(user, setUser);

    const loginUser = async event => {
        event.preventDefault();

        const res = await fetch("/api/login", {
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });

        const result = await res.json();

        if (result.success) {
            saveUser(result.user);
            await router.push("/");
        } else {
            // handle error
        }
    };

    return (
        <Container>
            <h2>Login</h2>

            <div>
                <Form onSubmit={loginUser}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We will never share your email with anyone else.
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
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;

