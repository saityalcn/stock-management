import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Siparis from './siparis';
import Indirimler from './indirimler';
import AzStok from './stoguazalan';
import CalisanlarTablo from './calisanlartablo';
import { useEffect } from 'react';
import {
  Header,
  Icon,
  Button,
  Form,
  Card
} from 'semantic-ui-react';
import MainLayout from './layout';

export default () => {
  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="semantic/dist/semantic.min.css"
      ></link>
        <MainLayout>
              <Header as="h2">Çalışanlar</Header>
              <CalisanlarTablo></CalisanlarTablo>
        </MainLayout>
    </div>
  );
};
