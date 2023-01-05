import { React, useCallback, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Icon,
  Input,
} from 'semantic-ui-react';
import Layout from './layout';

let product_id;
let branch_id;

let subeler = [];
let options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
];

let options1 = [{ key: '', text: '', value: '' }];

let urunler = [];
// const render_subeler_option = (subeler) => {
//   subeler.map((sube) => {
//     console.log(sube.branch_name);
//     return <option value={sube.branch_name}>{sube.branch_name}</option>;
//   });
// };
const print_value = () => {
  console.log('sajdnasnjkd');
  // console.log(value);
};
const siparis_olustur = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:10500/branches`)
      .then((res) => res.json())
      .then((data) => {
        setData(true);
        subeler = data.branches;
        options = subeler.map((element) => ({
          key: element.branch_id,
          text: element.branch_name,
          value: element.branch_id,
        }));
      });
    setLoading(true);
    // console.log('2. fethc oncesi!');

    fetch(`http://localhost:10500/product_info`)
      .then((res) => res.json())
      .then((data) => {
        setData(true);
        urunler = data;
        console.log('URUNLER  oncesi');
        console.log(urunler);
        options1 = urunler.map((element) => ({
          key: element.info_id,
          text: element.product_name,
          value: element.info_id,
        }));
      });
    console.log('dsadsaaksdjnjkasd');
  }, []);

  //    useEffect(() => {
  //      setLoading(true);
  //      fetch(`http://localhost:10500/${sayfa}`)
  //        .then((res) => res.json())
  //        .then((data) => {
  //          setData(orderId);
  //          orders = data.orders;
  //          setLoading(false);
  //        });
  //    }, [orders]);
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
  });

  const writeOrderToDataBase = useCallback(async (event) => {
    const amount = event.target.miktar.value;
    const estimated_shipment_date = event.target.estimated.value;
    const skt = event.target.estimated.value;
    const jsonObject = JSON.stringify({
      product_id: product_id,
      amount: amount,
      estimated_shipment_date: estimated_shipment_date,
      branch_id: branch_id,
      skt: skt,
    });
    const response = await fetch('http://localhost:10500/add-order', {
      method: 'POST',
      headers: myHeaders,
      body: jsonObject,
    });
  });

  return (
    <Layout>
      <Form onSubmit={() => writeOrderToDataBase}>
        <Form.Select
          label="Ürün"
          options={options1}
          onChange={(e, data) => {
            product_id = data.value;
          }}
          loading={!loading}
        ></Form.Select>

        <Form.Select
          label="Teslimat Şubesi"
          options={options}
          onChange={(e, data) => {
            branch_id = data.value;
          }}
        ></Form.Select>

        <Form.Field name="miktar" label="Miktar" control="input" />
        <Form.Input name="estimated" type="date" label="Teslimat Tarihi" />
        <Form.Input
          name="skt"
          type="date"
          label="Ürün'ün Son Kullanım Tarihi"
        />
        <Button
          floated="right"
          icon
          labelPosition="left"
          style={{ marginBottom: '2rem' }}
          positive
          type="submit"
        >
          <Icon name="plus"></Icon>
          Siparisi Olustur
        </Button>
      </Form>
    </Layout>
  );
};

export default siparis_olustur;
