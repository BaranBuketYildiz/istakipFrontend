import { useEffect, useState } from "react";
import { Row, Container, Table, Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import CustomerForm from "./CustomerForm";

export default function Customer() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customer, setCustomer] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updateFiled, setUpdateFiled] = useState(0);
    const [show, setShow] = useState(false);

    const handleShowForm = (customer) => {
        console.log("Selected Customer:", customer); // Debugging line

        setSelectedCustomer(customer);
        setShowForm(true);


    };

    const handleCloseShowForm = () => {
        setShowForm(false);



        setSelectedCustomer(null);
    };
    useEffect(() => {
        loadCustomer();
    },);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000)
        return () => clearTimeout(timer);
    }, [show]);


    function loadCustomer() {
        fetch(`http://localhost:8080/customers`)
            .then(res => res.json())
            .then(result => {
                setCustomer(result.content);
            })
    }
    function deleteCustomer(customerId) {
        console.log(customer.id);
        fetch(`http://localhost:8080/customers/delete/${customerId} `, {
            method: "DELETE"
        }).then(res => res.json);
    }
    function handleUpdate(updatedFields) {
        setUpdateFiled(updatedFields);
        setShow(true);
    }


    return <>
        <Container>
            <Row>
            <Alert key={'info'} variant={'info'} show={show} >
                `Güncellenen alan sayısı: ${updateFiled}`
            </Alert>
                <Col className="my-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Şirket Adı</th>
                                <th>Müşteri Adı</th>
                                <th>Müşteri Soyadı</th>
                                <th>Telefon NO</th>
                                <th>İL</th>
                                <th>İLÇE</th>
                                <th>Mahalle</th>
                                <th>Vergi Daire NO</th>
                                <th>Vergi Daire</th>
                                <th>TC</th>
                                <th>Oluşturulma Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.map((customers) => (
                                <tr key={customers.id}>
                                    <td>{customers.sirketAdi}</td>
                                    <td>{customers.ad}</td>
                                    <td>{customers.soyad}</td>
                                    <td>Telefon NO</td>
                                    <td>İL</td>
                                    <td>İLÇE</td>
                                    <td>Mahalle</td>
                                    <td>{customers.vergiDaireAd}</td>
                                    <td>{customers.vergiDaireNo}</td>
                                    <td>{customers.tc}</td>
                                    <td>Oluşturulma Tarihi</td>
                                    <td>   <Button
                                        variant="primary"
                                        onClick={() => {
                                            handleShowForm(customers)
                                        }}

                                    >
                                        Güncelle
                                    </Button></td>



                                    <td> <Button variant="danger" onClick={() => deleteCustomer(customers.id)}>Sil</Button>{' '}</td>


                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

            </Row>
            <Button variant="success" onClick={() => handleShowForm(null)}>Yeni Müşteri Ekle</Button>
            {showForm && (
                <CustomerForm onClose={handleCloseShowForm} customer={selectedCustomer} onUpdate={handleUpdate} />
            )}
           
        </Container>
    </>
}