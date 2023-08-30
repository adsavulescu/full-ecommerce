// pages/admin/products/[id].js

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Container, Form, Image } from "react-bootstrap";

export default function EditProduct() {
    const {
        query: { id },
    } = useRouter();
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const router = useRouter();

    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.setAttribute("enctype", "multipart/form-data");
        }

        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setImage(data.image);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
        }

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        if (!formData.get("image")) {
            formData.set("image", image);
        }

        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            router.push("/admin/products");
        } else {
            alert("Failed to update product");
        }
    };

    return (
        <Container>
            <h1>Edit Product</h1>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Image src={`/uploads/${image}`} width={50}  />
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    );
}
