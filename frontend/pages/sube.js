import React, { use, useCallback, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react'
import { Container, Card, Image, Button, Menu, Icon, Tab, Label, Table, Item,Form, Input, Modal } from 'semantic-ui-react';
import MainLayout from './layout';
import { useRouter } from 'next/router';
import Layout from './layout';

let urunler = [];
let calisanlar = [];
var open, setOpen;
var discountModelOpen, setDiscountModalOpen; 
var isDiscountReqSending, setIsDiscountReqSending;
var isSaleReqSending, setIsSaleReqSending;
var sendDiscountRequest, sendAddSaleRequest;
var selectedProductId;
let branchId;
var productInfoId;

const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

const panes = [
  { menuItem: 'Ürünler', render: () => <Tab.Pane>{render_urunler()}</Tab.Pane> },
  { menuItem: 'Çalışanlar', render: () => <Tab.Pane>{render_calisanlar()}</Tab.Pane> },
];


const render_urunler = () => {
 return (
<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Ürün ID</Table.HeaderCell>
        <Table.HeaderCell>Ürün İsmi</Table.HeaderCell>
        <Table.HeaderCell>Ürün Birim Fiyatı</Table.HeaderCell>
        <Table.HeaderCell>Son Kullanma Tarihi</Table.HeaderCell>
        <Table.HeaderCell>Stok</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>{get_urunler(urunler)}</Table.Body>
  </Table>);
}
const render_calisanlar = () => {
  return (
 <Table celled>
     <Table.Header>
       <Table.Row>
         <Table.HeaderCell>Çalışan ID</Table.HeaderCell>
         <Table.HeaderCell>Çalışan İsmi</Table.HeaderCell>
         <Table.HeaderCell>Çalışan Yıllık Ücreti</Table.HeaderCell>
         <Table.HeaderCell>İzinli Durumu</Table.HeaderCell>
         <Table.HeaderCell>İzin Tarihi</Table.HeaderCell>
       </Table.Row>
     </Table.Header>
     <Table.Body>{get_calisanlar(calisanlar)}</Table.Body>
   </Table>);
 }


function get_urunler(urunler){
  return urunler.map((urun) => {
    return (
      <Table.Row>
        <Table.Cell>{urun.products_id}</Table.Cell>
        <Table.Cell>{urun.product_name}</Table.Cell>
        <Table.Cell>{urun.product_price}</Table.Cell>
        <Table.Cell>{urun.product_skt}</Table.Cell>
        <Table.Cell>{urun.product_stock}</Table.Cell>
        <Table.Cell>  
        <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                <Button animated='fade' primary onClick={() => {productInfoId = urun.products_infos_id}}>
                    <Button.Content visible>Satış Ekle</Button.Content>
                    <Button.Content hidden>
                        <Icon name='cc apple pay' />
                    </Button.Content>
                </Button>
                }>
                    <Modal.Header>Satış Ekle</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Form onSubmit={sendAddSaleRequest}>
                          <Container><Form.Input type='number' name="amount" label='Adet '/></Container>
                          <Card><Button type='submit' primary>Satış Ekle</Button></Card>
                        </Form>
                      </Modal.Description> 
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setOpen(false)}>Geri Dön</Button>
                    </Modal.Actions>
                </Modal> 
          
                 <Form>
          </Form></Table.Cell>
          <Table.Cell>  
        <Modal
                onClose={() => setDiscountModalOpen(false)}
                onOpen={() => setDiscountModalOpen(true)}
                open={discountModelOpen}
                trigger={
                  <Button
                  fluid
                  content="Indirim Yap"
                  icon="arrow alternate circle down"
                  positive
                  loading={false}
                  type="submit"
                  onClick={() => {selectedProductId = urun.products_id}}
                ></Button>
                }>
                    <Modal.Header>Indirim Yap</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Form onSubmit={sendDiscountRequest}>
                        <Container><Form.Input type='number' min="0" max="110" step="0.001" name="discountrate" label='Indirim Oranı'/></Container>
                        <Card><Button type='submit' primary>Indirim Yap</Button></Card>
                        </Form>
                      </Modal.Description> 
                    </Modal.Content>
                    <Modal.Actions> 
                        <Button negative onClick={() => setDiscountModalOpen(false)}>Geri Dön</Button>
                    </Modal.Actions>
                </Modal> 
          
                 <Form>
          </Form></Table.Cell>
      </Table.Row>
    );
  });
};
const get_calisanlar = (calisanlar) => {

  return calisanlar.map((calisan) => {
    return (
      <Table.Row>
        <Table.Cell>{calisan.employee_id}</Table.Cell>
        <Table.Cell>{calisan.employee_name}</Table.Cell>
        <Table.Cell>{calisan.employee_salary}</Table.Cell>
        <Table.Cell>{calisan.awl}</Table.Cell>
        <Table.Cell>{calisan.awl_date}</Table.Cell>
      </Table.Row>
    );
  });
};


const subeler = () => {
sendDiscountRequest = useCallback(
  async (event) => {
    if (isDiscountReqSending) return;
    setIsDiscountReqSending(true);
    console.log(selectedProductId);
    const jsonObject = JSON.stringify({ discount_rate: event.target.discountrate.value, product_id: selectedProductId});
    console.log("Discount");
    console.log(jsonObject);
    const response = await fetch(
      'http://localhost:10500/add-discount',
      { method: 'POST', headers: myHeaders, body: jsonObject }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if(jsonResponse.name==='error')
      alert("Indirim oranı kontrol Trigger'ı tetiklendi. Lütfen 0-100 aralığında bir indirim oranı giriniz.");
    
    else
      window.location.reload(false);
  
    setIsDiscountReqSending(false);
  },
  [isDiscountReqSending]
);

sendAddSaleRequest = useCallback(
  async (event) => {
    if (isSaleReqSending) return;
    setIsSaleReqSending(true);
    const jsonObject = JSON.stringify({ info_id: productInfoId, amount: event.target.amount.value, branch_id: branchId });
    console.log(jsonObject);
    const response = await fetch(
      'http://localhost:10500/add-sale',
      { method: 'POST', headers: myHeaders, body: jsonObject }
    );
    //jsonResponse = await response.json();
    //console.log(jsonResponse);
    window.location.reload(false);
    setIsSaleReqSending(false);
  },
  [isSaleReqSending]
);
  const router = useRouter();
  [open,setOpen] = useState(false);
  [discountModelOpen, setDiscountModalOpen] = useState(false);
  [isDiscountReqSending, setIsDiscountReqSending] = useState(false);
  [isSaleReqSending, setIsSaleReqSending] = useState(false);
  const branch_id = router.query.branch_id;
  branchId = branch_id;
  const url_products = 'http://localhost:10500/branch/products/' + branch_id;
  const url_employees = 'http://localhost:10500/branch/employees/' + branch_id;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if(branch_id !== undefined){
      fetch(url_products)
        .then((res) => res.json())
        .then((data) => {
          setData("urunId");
          urunler = data.products_with_infos;
          setLoading(false);
        });
      fetch(url_employees)
           .then((res) => res.json())
           .then((data) => {
             setData("calisanId");
             calisanlar = data.employees_from_branch;
             setLoading(false);
           });
    }
  }, [urunler,calisanlar,url_products]);

  return (
    <Layout>
      <Tab panes={panes} />
    </Layout>
  )
  
};

export default subeler;
