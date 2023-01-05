import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Form, Visibility, Icon } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';

let orders = [];
let orderId;
let interval;
const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

//TODO: siparis gelirse o satiri disable edip yesile boya,

const getOrderId = (selectedOrderId) => {
  orderId = selectedOrderId;
};

export const render_siparisler = (siparisler) => {
  const [isSending, setIsSending] = useState(false);

  const sendRequest = useCallback(
    async (event) => {
      if (isSending) return;
      setIsSending(true);
      const jsonObject = JSON.stringify({ orderid: orderId });
      //console.log(jsonObject);
      const response = await fetch(
        'http://localhost:10500/update-order-state',
        { method: 'POST', headers: myHeaders, body: jsonObject }
      );
      //jsonResponse = await response.json();
      //console.log(jsonResponse);
      setIsSending(false);
    },
    [isSending]
  );

  return siparisler.map((siparis) => {
    let flag = true;
    if (siparis.order_state === 'Teslim Edildi') {
      flag = false;
    }
    console.log(siparis);
    return (
      <Table.Row>
        <Table.Cell>{siparis.order_id}</Table.Cell>
        <Table.Cell>{siparis.product_name}</Table.Cell>
        <Table.Cell>{siparis.amount}</Table.Cell>
        <Table.Cell>{siparis.branch_name}</Table.Cell>
        <Table.Cell>{siparis.order_date}</Table.Cell>
        <Table.Cell>{siparis.estimated_shipment_date}</Table.Cell>
        <Table.Cell>{siparis.order_state}</Table.Cell>
        <Table.Cell>
          <Form onSubmit={sendRequest}>
            {flag && (
              <Button
                fluid
                content="Onayla"
                icon="check circle"
                positive
                loading={isSending}
                type="submit"
                onClick={getOrderId(siparis.order_id)}
              ></Button>
            )}
          </Form>
        </Table.Cell>
      </Table.Row>
    );
  });
};

function siparis_table(props) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [inOrders, setInOrders] = useState(false);
  const sayfa = props.sayfa;

  useEffect(() => {
    if (sayfa === 'orders') {
      setInOrders(true);
    }

    setLoading(true);
    fetch(`http://localhost:10500/${sayfa}`)
      .then((res) => res.json())
      .then((data) => {
        setData(orderId);
        orders = data.orders;
        setLoading(false);
        console.log(inOrders);
        console.log(orders);
      });
  }, [orders]);

  return (
    <Table unstackable padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Ürün</Table.HeaderCell>
          <Table.HeaderCell>Miktar(adet)</Table.HeaderCell>
          <Table.HeaderCell>Şube</Table.HeaderCell>
          <Table.HeaderCell>Sipariş Tarihi</Table.HeaderCell>
          <Table.HeaderCell>Beklenen Teslim Tarihi</Table.HeaderCell>
          <Table.HeaderCell>Durumu</Table.HeaderCell>

          <Table.HeaderCell> </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{render_siparisler(orders)}</Table.Body>
      {inOrders ? (
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              <Button floated="right" primary size="small" fluid>
                <Icon name="plus circle" /> Sipariş Ver
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      ) : null}
    </Table>
  );
}

export default siparis_table;
