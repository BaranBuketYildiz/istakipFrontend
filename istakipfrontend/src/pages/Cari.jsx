import ReusableTable from "../ReusablePages/ReusableTable";

export default function(){
    const columns=
    [
        { header: "Cari Tip", accessor: "cariTip", placeHolder: "Cari kodunu giriniz", select:"ListSelect",type:"caritip"},
        { header: "Şirket Adı", accessor: "customer", placeHolder: "Müşteri adını giriniz"  ,select:"ListSelect",type:"customers"},
        { header: "Ürün", accessor: "urun", placeHolder: "ürün giriniz",select:"ListSelect",type:"urun" },
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