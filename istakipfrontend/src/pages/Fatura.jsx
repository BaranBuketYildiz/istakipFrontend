import ReusableTable from "../ReusablePages/ReusableTable";

export default function(){
    const columns=
    [
        { header: "Cari Tip", accessor: "cariTip", placeHolder: "Cari kodunu giriniz", select:"ListSelect",type:"caritip"},
        { header: "Şirket Adı", accessor: "customer", placeHolder: "Müşteri adını giriniz"  ,select:"ListSelect",type:"customers"},
        
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