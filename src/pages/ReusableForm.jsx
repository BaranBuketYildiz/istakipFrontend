export default function ReusableForm({ onClose, record, onUpdate, fields, apiUrl, modalTitle }) {
    const [selectedRecord, setSelectedRecord] = useState();

    useEffect(() => {
        if (record) {
            setSelectedRecord(record);
        }
    }, [record]);

    function saveOrUpdateRecord() {
        const url = selectedRecord.id ? `${apiUrl}/${selectedRecord.id}` : apiUrl;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify(selectedRecord),
        }).then(res => res.json())
            .then(result => {
                onUpdate(result.updatedFields);
            });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSelectedRecord({ ...selectedRecord, [name]: value });
    }

    const handleSaveAndClose = () => {
        saveOrUpdateRecord();
        onClose();
    }

    return (
        <Modal show onHide={onClose} className='modal-lg'>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {fields.map(field => (
                        <Form.Group as={Col} controlId={field.name} key={field.name}>
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Control
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={selectedRecord[field.name]}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    ))}
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