import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Form, Visibility } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

let orders = [];
let orderId;
let interval;
const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

//TODO siparis gelirse o satiri disable edip yesile boya,

const getOrderId = (selectedOrderId) => {
  orderId = selectedOrderId;
};

const render_siparisler = (siparisler) => {
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  return siparisler.map((siparis) => {
    return (
      <Table.Row>
        <Table.Cell>{siparis.products_id}</Table.Cell>
        <Table.Cell>{siparis.branch_name}</Table.Cell>
        <Table.Cell>{siparis.product_name}</Table.Cell>
        <Table.Cell>{siparis.product_stock}</Table.Cell>
        <Table.Cell>{siparis.product_price}</Table.Cell>
        <Table.Cell>
          <Form>
            <Button
              fluid
              content="Sipariş Ver"
              icon="check circle"
              positive
              loading={isSending}
              type="submit"
              onClick={() => {router.push('/siparis_ver');}}
            ></Button>
          </Form>
        </Table.Cell>
      </Table.Row>
    );
  });
};

function siparis_table() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:10500/least-stock-products')
      .then((res) => res.json())
      .then((data) => {
        setData(orderId);
        orders = data;
        setLoading(false);
      });
  }, [orders]);

  return (
    <Table unstackable padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Şube</Table.HeaderCell>
          <Table.HeaderCell>Ürün</Table.HeaderCell>
          <Table.HeaderCell>Stok Miktarı</Table.HeaderCell>
          <Table.HeaderCell>Fiyat</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{render_siparisler(orders)}</Table.Body>
    </Table>
  );
}

export default siparis_table;
