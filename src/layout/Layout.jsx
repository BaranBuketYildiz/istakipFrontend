import { Container, Navbar, NavbarToggle, Nav, Form, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <><Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/" size="lg">Kakule</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="customer">Müşteri</Nav.Link>
                        <Nav.Link href="urun">Ürünler</Nav.Link>
                        <Nav.Link href="customer">Satış</Nav.Link>
                        <Nav.Link href="customer">E-Fatura</Nav.Link>

                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar><Outlet /></>

    );



}
