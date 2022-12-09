import React from 'react';
import Layout from './layout';
import Siparis from './siparis';
import { render_siparisler } from './siparis';
import { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';

let orders = [];

export default (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const sayfa = props.sayfa;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:10500/${sayfa}`)
      .then((res) => res.json())
      .then((data) => {
        setData(orderId);
        orders = data.orders;
        setLoading(false);
      });
  }, [orders]);
  return (
    <Layout>
      <Siparis sayfa="orders"></Siparis>
    </Layout>
  );
};
