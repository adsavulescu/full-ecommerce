import {Col, Container, Row} from "react-bootstrap";
import FullScreenSlider from "@/components/FullScreenSlider";
import data from "@/data.json";
import Product from "@/components/Product";
import { useRouter } from "next/router";
import {useContext} from "react";
import {UserContext} from "@/context/UserContext";
const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    let yourData = {
        test:"123"
    }

    const checkMe = async () => {
        const response = await fetch("/api/authenticated", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(yourData)
        });
    }

    return (
        <>
            <FullScreenSlider></FullScreenSlider>

            <button onClick={checkMe}>check auth</button>

            <Container>
                <h2>Products</h2>

                <Row>
                    {data.map(product => (
                        <Col md={4} key={product.id}>
                            <Product
                                product={product}
                                actionText="View"
                                onAction={product => router.push(`/product/${product.id}`)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Home;

