import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react'

let orders = [];

//TODO siparis gelirse o satiri disable edip yesile boya,

const render_siparisler = (siparisler) => {
    return siparisler.map((siparis) => {
      let flag = true;
      if (siparis.order_state === "Teslim Edildi") {
        flag = false;
      }
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
            {flag && (
              <Button
                fluid
                content="Onayla"
                icon="check circle"
                positive
              ></Button>
            )}
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
        setData(data)
        orders = data.orders;
        setLoading(false)
      })
  }, []);
  
  return (
    <Table unstackable padded style={{ width: 'calc(100% - 150px)' }}>
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
    </Table>
  );
};

export default siparis_table;

