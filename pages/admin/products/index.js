// pages/admin/products/index.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {Container, Image, Tab, Table} from "react-bootstrap";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        }

        fetchProducts();
    }, []);

    return (
        <Container>
            <h1>Admin - Products</h1>
            <Link href="/admin/products/new">
                Create New Product
            </Link>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                            <Image src={`/uploads/${product.image}`} width={50}  />
                        </td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>
                            <Link href={`/admin/products/${product.id}`} className='btn btn-primary'>
                                Edit
                            </Link>
                            <button
                                className='btn btn-primary'
                                onClick={async () => {
                                    const res = await fetch(`/api/products/${product.id}`, {
                                        method: 'DELETE',
                                    });

                                    if (res.ok) {
                                        setProducts(products.filter((p) => p.id !== product.id));
                                    } else {
                                        alert('Failed to delete product');
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
