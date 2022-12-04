import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Form, Visibility } from 'semantic-ui-react';
import { useEffect } from 'react'
import { useState,useCallback } from 'react';

let orders = [];
let orderId;
let interval;
const myHeaders = new Headers({
  'Content-Type': 'application/json'
});

//TODO siparis gelirse o satiri disable edip yesile boya,

const getOrderId = (selectedOrderId) => {
  orderId = selectedOrderId;
}

const render_siparisler = (siparisler) => {
    const [isSending, setIsSending] = useState(false);

    const sendRequest = useCallback(async (event) => {
      if (isSending) return;
      setIsSending(true);
      const jsonObject = JSON.stringify({orderid: orderId});
      console.log(jsonObject);
      const response = await fetch('http://localhost:10500/update-order-state', {method: "POST", headers: myHeaders, body:jsonObject});
      //jsonResponse = await response.json();
      //console.log(jsonResponse);
      //window.location.reload(false);
      setIsSending(false)
    }, [isSending]);

    return siparisler.map((siparis) => {
      let flag = true;
      if (siparis.order_state === "Teslim Edildi") {
        flag = false;
      }
      return (
        <Table.Row>
          <Table.Cell>{siparis.order_id}</Table.Cell>
          <Table.Cell>{siparis.branch_name}</Table.Cell>
          <Table.Cell>{siparis.product_name}</Table.Cell>
          <Table.Cell>{siparis.stock}</Table.Cell>
          <Table.Cell>{siparis.estimated_shipment_date}</Table.Cell>
          <Table.Cell>
            <Form onSubmit={sendRequest}>
                <Button
                  fluid
                  content="Sipariş Ver"
                  icon="check circle"
                  positive  
                  loading={isSending}
                  type='submit'
                  onClick={getOrderId(siparis.order_id)}
                ></Button>
            </Form>
          </Table.Cell>
        </Table.Row>
      );
    });
};

function siparis_table(){
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:10500/orders')
      .then((res) => res.json())
      .then((data) => {
        setData(orderId)
        orders = data.orders;
        setLoading(false)
      })
  }, [orders]);
  
  return (
    <Table unstackable padded style={{ width: 'calc(100% - 150px)' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Şube</Table.HeaderCell>
          <Table.HeaderCell>Ürün</Table.HeaderCell>
          <Table.HeaderCell>Stok Miktarı</Table.HeaderCell>
          <Table.HeaderCell>ABCdef</Table.HeaderCell>
          <Table.HeaderCell>Sipariş Ver</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{render_siparisler(orders)}</Table.Body>
    </Table>
  );
};

export default siparis_table;

