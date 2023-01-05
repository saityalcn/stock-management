import { React, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Checkbox, Container, Form, Input } from 'semantic-ui-react';
import Layout from './layout';

let subeler = [];
let options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
];
// const render_subeler_option = (subeler) => {
//   subeler.map((sube) => {
//     console.log(sube.branch_name);
//     return <option value={sube.branch_name}>{sube.branch_name}</option>;
//   });
// };

const siparis_olustur = () => {
  const [data, setData] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:10500/branches`)
      .then((res) => res.json())
      .then((data) => {
        setData(true);
        subeler = data.branches;
        options = subeler.map((element) => ({
          key: element.branch_name,
          text: element.branch_name,
          value: element.branch_name,
        }));
      });
  }, [subeler]);

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

  return (
    <Layout>
      <Form>
        <Form.Group widths="equal">
          <Form.Field label="Ürün" control="input" />
          <Form.Select options={options}></Form.Select>

          {/* <Form.Field label="Şube" control="select">
           
          </Form.Field> */}
        </Form.Group>
      </Form>
    </Layout>
  );
};

export default siparis_olustur;
