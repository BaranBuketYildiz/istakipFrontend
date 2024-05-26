import { useEffect, useState } from "react";
import { Row, Container, Table, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function ReusableTable({
  columns,
  dataEndpoint,
  onShowForm,
  deleteDataEndPoint,
}) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [updateFiled, setUpdateFiled] = useState(0);

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

  function handleUpdate(updatedFields) {
    setUpdateFiled(updatedFields);
    setShow(true);
  }
  function handleDelete(customerId) {
    fetch(`${deleteDataEndPoint}${customerId}`, {
      method: "DELETE",
    }).then((res) => res.json)
    .then(
      loadData()
    );
    
  }
  
  return (
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
                    <Button variant="primary" onClick={() => onShowForm(item)}>
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
    </Container>
  );
}
