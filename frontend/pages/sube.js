import React, { use, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react'
import { Grid, Segment, Card, Image, Button, Menu, Icon, Tab, Label, Table } from 'semantic-ui-react';
import MainLayout from './layout';
import { useRouter } from 'next/router';
import Layout from './layout';

const panes = [
  { menuItem: 'Ürünler', render: () => <Tab.Pane>{render_urunler()}</Tab.Pane> },
  { menuItem: 'Çalışanlar', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
]

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

    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>);
}


const subeler = () => {
 const [subelerimiz, set_subelerimiz] = useState([]); 
  useEffect(() => {
    fetch('http://localhost:10500/branches')
      .then((res) => res.json())
      .then((data) => {
        set_subelerimiz(data.branches);
      })
  }, []);

  return (
    <Layout>
      <Tab panes={panes} />
    </Layout>
  )
  
};

export default subeler;
