// pages/admin/orders/[id].js

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Form, Image } from "react-bootstrap";

export default function EditOrder() {
    const {
        query: { id },
    } = useRouter();
    const [status, setStatus] = useState('');
    const [price, setPrice] = useState('');
    const router = useRouter();

    const formRef = useRef(null);

    useEffect(() => {

        async function fetchOrder() {
            const res = await fetch(`/api/orders/${id}`);
            const data = await res.json();
            setStatus(data.status);
            setPrice(data.price);
        }

        if (id) {
            fetchOrder();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (res.ok) {
            router.push('/admin/orders');
        } else {
            alert('Failed to update order');
        }
    };

    return (
        <Container>
            <h1>Edit Order</h1>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    );
}
