import ReusableTable from "../ReusablePages/ReusableTable";

export default function Customer() {


  const columns = [
    { header: "Şirket Adı", accessor: "sirketAdi" , placeHolder:"Şirket Adını Giriniz"},
    { header: "Müşteri Adı", accessor: "ad", placeHolder:"Müşteri Adını Giriniz" },
    { header: "Müşteri Soyadı", accessor: "soyad", placeHolder:"Müşteri Soyadını Giriniz" },
    { header: "Telefon NO", accessor: "telefonNO", placeHolder:"Telefon numarasını Giriniz" },
    { header: "İL", accessor: "il", placeHolder:"İl Şecin" },
    { header: "İLÇE", accessor: "ilce", placeHolder:"İlçe Şecin" },
    { header: "Mahalle", accessor: "mahalle", placeHolder:"Mahalle Şecin" },
    { header: "Vergi Daire NO", accessor: "vergiDaireNo", placeHolder:"Vergi Daire NO Giriniz" },
    { header: "Vergi Daire", accessor: "vergiDaireAd", placeHolder:"Vergi Daaire Giriniz" },
    { header: "TC", accessor: "tc", placeHolder:"Müşteri TC Giriniz" },
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
