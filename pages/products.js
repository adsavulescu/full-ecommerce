import React, {useEffect, useState} from 'react';
import data from '../data.json';
import Product from '../components/Product';
import { useRouter } from 'next/router';
import {Container, Row, Col, FormSelect, Form} from 'react-bootstrap';

const Products = () => {
    const router = useRouter();

    const [filters, setFilters] = useState({color: '', price: Infinity});
    const [filteredData, setFilteredData] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const filterData = (data) => {
        setFilteredData(data.filter(product =>
            (product.color === filters.color || !filters.color) &&
            (product.price <= filters.price || !filters.price)
        ));
    };

    useEffect(() => {
        // Fetch products from the API
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setFilteredData(data);
                filterData(data);
            })
            .catch(error => console.error('Error fetching products:', error));

    }, []);

    useEffect(() => {
        filterData(filteredData);
    }, [filters]);

    return (
        <Container>

            <Row>
                <Col md={3}>
                    <h3>Filters</h3>

                    <div>
                        <h4>Color</h4>
                        <FormSelect name="color" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            {/* Add other colors */}
                        </FormSelect>
                    </div>
                    <div>
                        <Form.Group className="mb-3" controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" placeholder="Enter price" onChange={handleFilterChange}/>
                        </Form.Group>
                    </div>

                </Col>

                <Col md={9}>
                    <h2>Products</h2>

                    <Row>
                        {filteredData.map(product => (
                            <Col md={4} key={product.id}>
                                <Product
                                    product={product}
                                    actionText="View"
                                    onAction={product => router.push(`/product/${product.id}`)}
                                />
                            </Col>
                        ))}
                    </Row>

                </Col>
            </Row>
        </Container>
    );
};

export default products;
