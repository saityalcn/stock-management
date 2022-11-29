import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button } from 'semantic-ui-react';
//TODO siparis gelirse o satiri disable edip yesile boya,
const siparisler = [
  {
    id: '3',
    urun: 'milla',
    miktar: '5',
    sube: 'tekerek',
    siparis_veris: '20-01-2001',
    siparis_teslim: '21-01-2001',
    siparis_durumu: '',
  },
  {},
  {},
  {},
  {},
];

const render_siparisler = () => {
  return siparisler.map((siparis) => {
    let flag = true;
    if (siparis.siparis_durumu === 'Bekleniyor') {
      flag = false;
    }
    return (
      <Table.Row>
        <Table.Cell>{siparis.id}</Table.Cell>
        <Table.Cell>{siparis.urun}</Table.Cell>
        <Table.Cell>{siparis.miktar}</Table.Cell>
        <Table.Cell>{siparis.sube}</Table.Cell>
        <Table.Cell>{siparis.siparis_veris}</Table.Cell>
        <Table.Cell>{siparis.siparis_teslim}</Table.Cell>
        <Table.Cell>{siparis.siparis_durumu}</Table.Cell>
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

export default () => {
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

      <Table.Body>{render_siparisler()}</Table.Body>
    </Table>
  );
};
