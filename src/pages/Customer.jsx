import ReusableTable from "./ReusableTable";

export default function Customer() {


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
        deleteDataEndPoint="http://localhost:8080/customers/delete/"
      />
    </>
  );
}
