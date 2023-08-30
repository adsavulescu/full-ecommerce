// pages/admin/products/new.js

import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {Button, Container, Form} from "react-bootstrap";

export default function NewProduct() {
    const router = useRouter();

    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.setAttribute('enctype', 'multipart/form-data');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        console.log(Array.from(formData));

        const res = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            await router.push('/admin/products');
        } else {
            alert('Failed to create product');
        }
    };

    return (
        <Container>
            <h1>Create New Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        name="description"
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add product
                </Button>
            </Form>
        </Container>
    );
}
