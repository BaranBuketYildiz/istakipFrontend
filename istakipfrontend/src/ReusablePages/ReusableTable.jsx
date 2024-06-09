import { useEffect, useState, useRef } from "react";
import { Row, Container, Table, Alert, Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ReusableMessage from "./ReusableMessage";
import ContextMenu from "./ContexMenu";
export default function ReusableTable({
  columns,
  dataEndpoint,
  tableName


}) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [updateFiled, setUpdateFiled] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Silme işlemi için modalı ekliyoruz
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const contextMenuRef = useRef(null);
  const [fetchData, setFetchData]=useState([]);

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      item,
    });
  };
  useEffect(() => {
    loadData();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
      setContextMenu(null);
    }
  };

  useEffect(() => {
    console.log('Selected Record:', selectedRecord);
  }, [selectedRecord]);


  useEffect(() => {
    console.log('on gling Record:', fetchData);
  }, [fetchData]);

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
    fetch(dataEndpoint+tableName)
      .then((res) => res.json())
      .then((result) => {
        setData(result.content);
      });
  }


  function handleDelete(customerId) {
    setSelectedRecord({ id: customerId });
    setShowDeleteModal(true);
    setContextMenu(null);
  }

  function confirmDelete() {
    fetch(`${dataEndpoint+tableName+ '/delete/'}${selectedRecord.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setData(data.filter((item) => item.id !== selectedRecord.id));
          setShowDeleteModal(false);
        } else {
          console.error("Delete request failed:", res.status);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  function saveOrUpdateCustomer() {
    console.log(selectedRecord);
    const url = selectedRecord.id
      ? `${dataEndpoint + tableName}/${selectedRecord.id}`
      : `${dataEndpoint + tableName}`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(selectedRecord),
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        handleUpdate(result.updatedFields);
        loadData();
      });
  }

  function confirmUpdate() {
    saveOrUpdateCustomer();
    setShowUpdateModal(false);
    setShowForm(false);

  }
  function handleSaveButtonClick() {

    if (selectedRecord.id) {
      setShowUpdateModal(true);
      setContextMenu();
    } else {
      saveOrUpdateCustomer();
      setShowForm(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSelectedRecord({ ...selectedRecord, [name]: value });
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format the date as "YYYY-MM-DD"
  }
   
const  handleSelectClick= async (type)=>{
  const response = await fetch(`${dataEndpoint +type}`);
  const data = await response.json();
  console.log(data)
  setFetchData([]);
  setFetchData(data.content || []) ;
  

}
  return (
    <>
      <Row className="px-5">
        <Row className="position-absolute top-0 end-0 col-2">
          <Alert key={"info"} variant={"info"} show={show} >
            Güncellenen alan sayısı: {updateFiled}
          </Alert>
        </Row>

        <Col className="my-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col.header}</th>
                ))}
                <th>Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  {columns.map((col, index) => (
                    <td key={index} onContextMenu={(e) => handleContextMenu(e, item)}>
                      {typeof item[col.accessor] === "object" &&
                        item[col.accessor] !== null
                        ? `${item[col.accessor].name} ${item[col.accessor].plakaNo
                        }`
                        : item[col.accessor]}
                    </td>
                  ))}
                  <td>
                    {item.createDate ? formatDate(item.createDate) : "N/A"}
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => handleShowForm(item)}>
                      Güncelle
                    </Button>
                  </td>
                  <td>
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
      <Button variant="success" onClick={() => handleShowForm(null)} className="mx-5 ">
        Yeni Müşteri Ekle
      </Button>
      {showForm && (
        <Modal show onHide={handleCloseShowForm} className='modal-lg'>
          <Modal.Header closeButton>
            <Modal.Title>Müşteri</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {columns.map((field) => {
                if (field.select && field.select == 'ListSelect') {
                  console.log('Field:', field);
                  return (
                    <Form.Group as={Col} controlId={field.accessor} key={field.accessor}>
                      <Form.Label>{field.header}</Form.Label>
                      <Form.Select aria-label="Default select example" onClick={()=>handleSelectClick(field.type)} >
                        {fetchData.map((item) => {
                          return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        
                      </Form.Select>
                    </Form.Group>
                  )
                } else {
                  return (
                    <Form.Group as={Col} controlId={field.accessor} key={field.accessor}>
                      <Form.Label>{field.header}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field.accessor}
                        placeholder={field.placeHolder}
                        value={selectedRecord ? selectedRecord[field.accessor] : ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  )
                }
              }


              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseShowForm}>
              Kapat
            </Button>
            <Button variant="primary" onClick={handleSaveButtonClick}>
              Kaydet
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <ReusableMessage
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        title="Kaydı Sil"
        message="Bu kaydı silmek istediğinizden emin misiniz?"
        confirmButtonLabel="Sil"
        handleConfirm={confirmDelete}
      />
      <ReusableMessage
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        title="Kaydı Güncelle"
        message="Bu kaydı güncellemek istediğinizden emin misiniz?"
        confirmButtonLabel="Güncelle"
        handleConfirm={confirmUpdate}
      />
      {contextMenu && (
        <div ref={contextMenuRef}>
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onDelete={() => handleDelete(contextMenu.item.id)}
            onEdit={() => handleShowForm(contextMenu.item)}
          />
        </div>
      )}

    </>

  );
}
