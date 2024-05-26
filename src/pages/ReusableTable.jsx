import { useEffect, useState } from "react";
import { Row, Container, Table, Alert, Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function ReusableTable({
  columns,
  dataEndpoint,
  deleteDataEndPoint,

}) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [updateFiled, setUpdateFiled] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log('Selected Record:', selectedRecord);
  }, [selectedRecord]);

  const handleShowForm = (item) => {
    setSelectedRecord(item || {});
    setShowForm(true);
  };

  const handleCloseShowForm = () => {
    setShowForm(false);
    setSelectedRecord(null);
  };

  const handleUpdate = (updatedFields) => {
    setShow(true);
    setUpdateFiled(updatedFields);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [show]);

  function loadData() {
    fetch(dataEndpoint)
      .then((res) => res.json())
      .then((result) => {
        setData(result.content);
      });
  }


  function handleDelete(customerId) {
    fetch(`${deleteDataEndPoint}${customerId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setData(data.filter((item) => item.id !== customerId));
      } else {
        console.error('Delete request failed:', res.status);
      }
    }).catch(err => console.error('Fetch error:', err));
  }

  function saveOrUpdateCustomer() {
    console.log(selectedRecord);
    const url = selectedRecord.id
      ? `${dataEndpoint}/${selectedRecord.id}`
      : `${dataEndpoint}`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(selectedRecord),
    }).then(res => res.json())
      .then(result => {
        console.log(result);
  
        loadData();  
        handleCloseShowForm(); 
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSelectedRecord({ ...selectedRecord, [name]: value });
  }

S  return (
    <Container>
      <Row>
        <Alert key={"info"} variant={"info"} show={show}>
          `Güncellenen alan sayısı: ${updateFiled}`
        </Alert>
        <Col className="my-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col.header}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  {columns.map((col, index) => (
                    <td key={index}>
                      {typeof item[col.accessor] === "object" &&
                      item[col.accessor] !== null
                        ? `${item[col.accessor].name} ${
                            item[col.accessor].plakaNo
                          }`
                        : item[col.accessor]}
                    </td>
                  ))}
                  <td>
                    <Button variant="primary" onClick={() => handleShowForm(item)}>
                      Güncelle
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Sil
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Button variant="success" onClick={() => handleShowForm(null)}>
        Yeni Müşteri Ekle
      </Button>
      {showForm && (
        <Modal show onHide={handleCloseShowForm} className='modal-lg'>
          <Modal.Header closeButton>
            <Modal.Title>Müşteri</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {columns.map((field) => (
                <Form.Group as={Col} controlId={field.accessor} key={field.accessor}>
                  <Form.Label>{field.header}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field.accessor}
                    placeholder={field.header}
                    value={selectedRecord ? selectedRecord[field.accessor] : ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseShowForm}>
              Kapat
            </Button>
            <Button variant="primary" onClick={saveOrUpdateCustomer}>
              Kaydet
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>

  );
}
