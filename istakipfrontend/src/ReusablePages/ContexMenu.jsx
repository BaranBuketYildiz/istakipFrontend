import React from 'react';
import { Dropdown } from 'react-bootstrap';

const ContextMenu = ({ x, y, onEdit, onDelete }) => {
  const style = {
    position: 'absolute',
    top: y,
    left: x,
   
  };

  return (
    <Dropdown.Menu show style={style}>
    <Dropdown.Item eventKey="1" onClick={onEdit}>Güncelle</Dropdown.Item>
    <Dropdown.Item eventKey="2" onClick={onDelete}>Sil</Dropdown.Item>
    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
  </Dropdown.Menu>

  );
};

export default ContextMenu;
