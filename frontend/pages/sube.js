import React, { use, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react'
import { Grid, Segment, Card, Image, Button, Menu, Icon, Tab, Label, Table, Item } from 'semantic-ui-react';
import MainLayout from './layout';
import { useRouter } from 'next/router';
import Layout from './layout';

let urunler = [];
let calisanlar = [];

const panes = [
  { menuItem: 'Şube Bilgileri', render: () => <Tab.Pane>{render_sube_bilgisi()} </Tab.Pane> },
  { menuItem: 'Ürünler', render: () => <Tab.Pane>{render_urunler()}</Tab.Pane> },
  { menuItem: 'Çalışanlar', render: () => <Tab.Pane>{render_calisanlar()}</Tab.Pane> },
];

const render_sube_bilgisi = ()=>{
  return (<Item.Group>
    <Item>
      <Item.Image size='tiny' src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>)
}

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


const get_urunler = (urunler) => {

  return urunler.map((urun) => {
    return (
      <Table.Row>
        <Table.Cell>{urun.products_id}</Table.Cell>
        <Table.Cell>{urun.product_name}</Table.Cell>
        <Table.Cell>{urun.product_price}</Table.Cell>
        <Table.Cell>{urun.product_skt}</Table.Cell>
        <Table.Cell>{urun.product_stock}</Table.Cell>
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
  const router = useRouter();
  const branch_id = router.query.branch_id;
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
          console.log(data);
          urunler = data.products_with_infos;
          setLoading(false);
        });
      fetch(url_employees)
           .then((res) => res.json())
           .then((data) => {
             setData("calisanId");
             calisanlar = data.employees_from_branch;
             console.log(calisanlar);
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
