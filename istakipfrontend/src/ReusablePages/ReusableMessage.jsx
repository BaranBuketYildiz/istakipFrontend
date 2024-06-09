// ReusableMessage.js

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ReusableMessage({
  show,
  handleClose,
  title,
  message,
  confirmButtonLabel,
  handleConfirm,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hayır
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {confirmButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
