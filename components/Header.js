import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import {useContext} from "react";

export default function Header() {
    const { user, logout } = useContext(UserContext);

    return (
        <header className="bg-body-tertiary">
            <Navbar expand="lg" className="p-3 flex-row justify-content-between">
                <Navbar.Brand>
                    <Link href="/" className="navbar-brand">eCommerce</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav me-auto">
                    <Nav>
                        <Nav.Item>
                            <Link href="/products" className="nav-link">Products</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link href="/cart" className="nav-link">Cart</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link href="/admin/orders" className="nav-link">Admin Orders</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link href="/admin/products" className="nav-link">Admin Products</Link>
                        </Nav.Item>
                    </Nav>

                    <Nav>
                        {user ? (
                            <NavDropdown title="My Account" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Item>
                                    <Link href="/register" className="nav-link">Register</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link href="/login" className="nav-link">Login</Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
