import ReusableTable from "../ReusablePages/ReusableTable";

export default function(){
    const columns=
    [
        { header: "Cari Tip", accessor: "cari_tip_id", placeHolder: "Cari kodunu giriniz" },
        { header: "Şirket Adı", accessor: "customer_id", placeHolder: "Müşteri adını giriniz" },
        { header: "Ürün", accessor: "urun_id", placeHolder: "ürün giriniz" },
        { header: "Adet", accessor: "adet", placeHolder: "Adet giriniz" },
        { header: "Birim Fiyat", accessor: "birimFiyat", placeHolder: "Birim Fiyat giriniz" },
        { header: "toplamTutar", accessor: "toplamTutar",  defaultValue: "0"  },
        { header: "kdvTutar", accessor: "kdvTutar", placeHolder: "kdv tutar giriniz" },

    ];
    return (
        <>
          <ReusableTable
            columns={columns}
            tableName="cari"
            dataEndpoint="http://localhost:8080/"
            deleteDataEndPoint="http://localhost:8080/cari/delete/"
          />
        </>
      );
    
    
}