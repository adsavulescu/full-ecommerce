// pages/admin/orders/index.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {Container, Image, Tab, Table} from "react-bootstrap";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
        }

        fetchOrders();
    }, []);

    return (
        <Container>
            <h1>Admin - Orders</h1>
            <Link href="/admin/orders/new">
                Create New Order
            </Link>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.status}</td>
                        <td>${order.price}</td>
                        <td>
                            <Link href={`/admin/orders/${order.id}`} className='btn btn-primary'>
                                Edit
                            </Link>
                            <button
                                className='btn btn-primary'
                                onClick={async () => {
                                    const res = await fetch(`/api/orders/${order.id}`, {
                                        method: 'DELETE',
                                    });

                                    if (res.ok) {
                                        setOrders(orders.filter((p) => p.id !== order.id));
                                    } else {
                                        alert('Failed to delete order');
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
