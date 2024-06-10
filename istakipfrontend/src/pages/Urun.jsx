import ReusableTable from "../ReusablePages/ReusableTable";

export default function Customer() {
  const columns = [
    { header: "Ürün kodu", accessor: "kod", placeHolder: "Ürün kodunu giriniz" },
    {
      header: "Ürün adı",
      accessor: "name",
      placeHolder: "Ürün adını giriniz",
    },
    {
      header: "Ürün Tipi",
      accessor: "tip",
      type: "tip_id",
      select: "ListSelect",
      placeHolder: "Ürün Tipi Seçin",
    },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        tableName="urun"
        dataEndpoint="http://localhost:8080/"
        deleteDataEndPoint="http://localhost:8080/urun/delete/"
      />
    </>
  );
}
