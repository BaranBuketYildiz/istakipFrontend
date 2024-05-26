import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FormLabel } from "react-bootstrap";
import Col from 'react-bootstrap/Col';

export default function CustomerForm({ onClose,customer, onUpdate,saveOrUpdateCustomer }) {
    const[updateFiles,setUpdateFiles]=useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState();

    useEffect(() => {
        if (customer) {
            setSelectedCustomer(customer);
        }
    }, [customer]);


    function handleInputChange(e) {  // Corrected function name
        const { name, value } = e.target;
        console.log(name, value);
        setSelectedCustomer({ ...selectedCustomer, [name]: value });
    }
    const handleSaveAndClose =()=>{
          saveOrUpdateCustomer(selectedCustomer);
          onClose();
    }

    return (


        <Modal show onHide={onClose} className='modal-lg'>
            <Modal.Header closeButton>
                <Modal.Title>{customer ? 'Müşteri Güncelle' : 'Yeni Müşteri Ekle'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Col} controlId="sirketAdi">
                        <Form.Label>Şirket Adı</Form.Label>
                        <Form.Control
                            name="sirketAdi"
                            placeholder="Şirket Adını Giriniz"
                            value={selectedCustomer.sirketAdi}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="ad">
                        <FormLabel>Müşteri Adı</FormLabel>
                        <Form.Control
                            name="ad"
                            placeholder="Müşteri Adını Giriniz"
                            value={selectedCustomer.ad}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="soyad">
                        <FormLabel>Müşteri Soyadı</FormLabel>
                        <Form.Control
                            name="soyad"
                            placeholder="Müşterinin Soyadını Giriniz"
                            value={selectedCustomer.soyad}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                        <Form.Group as={Col} controlId="telefon">
                            <Form.Label>Telefon Numarası</Form.Label>
                            <Form.Control
                                name="telefon"
                                placeholder="Müşterinin telefon numarasını giriniz"
                                value={selectedCustomer.telefonNO}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Müşterinin emailini giriniz"
                                value={selectedCustomer.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="adres">
                            <Form.Label>Adres</Form.Label>
                            <Form.Control
                                name="adres"
                                placeholder="Müşteriniz adresini giriniz"
                                value={selectedCustomer.adres}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="vergiDaireNo">
                            <Form.Label>Vergi Daire Numarası</Form.Label>
                            <Form.Control
                                name="vergiDaireNo"
                                placeholder="Müşterinin vergi daire numarasını giriniz"
                                value={selectedCustomer.vergiDaireNo}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="vergiDaireAd">
                            <Form.Label>Vergi Daire</Form.Label>
                            <Form.Control
                                name="vergiDaireAd"
                                placeholder="Vergi Dairesini Giriniz"
                                value={selectedCustomer.vergiDaireAd}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="tc">
                            <Form.Label>TC</Form.Label>
                            <Form.Control
                                name="tc"
                                placeholder="Müşterinin TCsini giriniz"
                                value={selectedCustomer.tc}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Kapat
                </Button>
                <Button variant="primary" onClick={handleSaveAndClose} >
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>



    );
}



