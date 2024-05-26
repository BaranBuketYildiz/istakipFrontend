import { useState } from "react";
import ReusableTable from "./ReusableTable";
import CustomerForm from "./CustomerForm";
import { Button } from "react-bootstrap";

export default function Customer() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [show,setShow]=useState(false);
    const handleShowForm = (customer) => {
        setSelectedCustomer(customer);
        setShowForm(true);

        
    };

    const handleCloseShowForm = () => {
        setShowForm(false);
        setSelectedCustomer(null);
    };

    

    const handleUpdate = (updatedFields) => {
        setShow(true);
    };

  const columns = [
    { header: "Şirket Adı", accessor: "sirketAdi" },
    { header: "Müşteri Adı", accessor: "ad" },
    { header: "Müşteri Soyadı", accessor: "soyad" },
    { header: "Telefon NO", accessor: "telefonNO" },
    { header: "İL", accessor: "il" },
    { header: "İLÇE", accessor: "ilce" },
    { header: "Mahalle", accessor: "mahalle" },
    { header: "Vergi Daire NO", accessor: "vergiDaireNo" },
    { header: "Vergi Daire", accessor: "vergiDaireAd" },
    { header: "TC", accessor: "tc" },



    { header: "Oluşturulma Tarihi", accessor: "olusturulmaTarihi" },
  ];

    
  

  return (
    <>
      <ReusableTable
        columns={columns}
        dataEndpoint="http://localhost:8080/customers"
        onShowForm={handleShowForm}
        deleteDataEndPoint="http://localhost:8080/customers/delete/"
      />
      <Button variant="success" onClick={() => handleShowForm(null)}>
        Yeni Müşteri Ekle
      </Button>
      {showForm && (
        <CustomerForm
          onClose={handleCloseShowForm}
          customer={selectedCustomer}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
