import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Form, Tab, Icon, Card,Modal, Header, Image, Grid, Container } from 'semantic-ui-react';
import { useEffect } from 'react'
import { useState,useCallback } from 'react';
import { useRouter } from 'next/router';


let satislar = [];
let orderId;
const myHeaders = new Headers({
  'Content-Type': 'application/json'
});


const render_satislar = (satislar) => {
  return satislar.map((satis) => {
        const flag = true;
      return (
        <Table.Row>
            <Table.Cell>{satis.sale_id}</Table.Cell>
            <Table.Cell>{satis.branch_name}</Table.Cell>
            <Table.Cell>{satis.product_name}</Table.Cell>
            <Table.Cell>{satis.sold_price}</Table.Cell>
            <Table.Cell>{satis.amount}</Table.Cell>
            <Table.Cell>{satis.sold_date}</Table.Cell>
        </Table.Row>
      );
    });
};

function siparis_table(){
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:10500/sales')
      .then((res) => res.json())
      .then((data) => {
        setData(orderId)
        satislar = data;
        console.log(satislar);
        setLoading(false)
      })
  }, [satislar]);
  
  return (
    <Table unstackable padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Şube</Table.HeaderCell>
          <Table.HeaderCell>Ürün</Table.HeaderCell>
          <Table.HeaderCell>Satış Fiyatı</Table.HeaderCell>
          <Table.HeaderCell>Miktar</Table.HeaderCell>
          <Table.HeaderCell>Satış Tarihi</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{render_satislar(satislar)}</Table.Body>
    </Table>
  );
};

export default siparis_table;

