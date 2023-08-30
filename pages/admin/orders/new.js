// pages/admin/orders/new.js

import React, {useEffect, useRef, useState} from "react";
import { useRouter } from "next/router";
import {Button, Container, Form} from "react-bootstrap";

export default function NewOrder() {
    const router = useRouter();

    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        console.log(Array.from(formData));

        const res = await fetch("/api/orders", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            await router.push("/admin/orders");
        } else {
            alert("Failed to create order");
        }
    };

    return (
        <Container>
            <h1>Create New Order</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="status"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add order
                </Button>
            </Form>
        </Container>
    );
}
