import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Form, Visibility,Icon } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';

let products = [];
let productId;
let orderId;
let interval;
const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

//TODO siparis gelirse o satiri disable edip yesile boya,

const render_urunler = (urunler) => {
  const [isSending, setIsSending] = useState(false);

  const sendRequest = useCallback(
    async (event) => {
      if (isSending) return;
      setIsSending(true);
      const jsonObject = JSON.stringify({ product_id: productId});
      console.log(jsonObject);
      const response = await fetch(
        'http://localhost:10500/cancel-discount',
        { method: 'POST', headers: myHeaders, body: jsonObject }
      );
      //jsonResponse = await response.json();
      //console.log(jsonResponse);
      window.location.reload(false);
      setIsSending(false);
    },
    [isSending]
  );

  return urunler.map((urun) => {
    let flag = true;
    return (
      <Table.Row>
        <Table.Cell>{urun.products_id}</Table.Cell>
        <Table.Cell>{urun.branch_name}</Table.Cell>
        <Table.Cell>{urun.product_name}</Table.Cell>
        <Table.Cell>{urun.product_price}</Table.Cell>
        <Table.Cell>{urun.estimated_shipment_date}</Table.Cell>
        <Table.Cell>
          <Form onSubmit={sendRequest}>
          <Button inverted color='red' onClick={() => {
                productId = urun.products_id;
                sendRequest();
              }}>
                <Icon name='remove' />
                    Kaldır
            </Button>
          </Form>
        </Table.Cell>
      </Table.Row>
    );
  });
};

function urunler_tablo() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:10500/discounts')
      .then((res) => res.json())
      .then((data) => {
        setData(orderId);
        products = data;
        setLoading(false);
      });
  }, [products]);

  return (
    <Table unstackable padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Şube</Table.HeaderCell>
          <Table.HeaderCell>Ürün</Table.HeaderCell>
          <Table.HeaderCell>İndirimli Fiyat</Table.HeaderCell>
          <Table.HeaderCell>İndirim Bitiş</Table.HeaderCell>
          <Table.HeaderCell>İndirimi İptal Et</Table.HeaderCell>
          <Table.HeaderCell> </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{render_urunler(products)}</Table.Body>
    </Table>
  );
}

export default urunler_tablo;
