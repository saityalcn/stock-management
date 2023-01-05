import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import SatislarTablo from './satislar_tablo.js';
import {
  Header,
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
              <Header as="h2">Satışlar</Header>
              <SatislarTablo></SatislarTablo>
        </MainLayout>
    </div>
  );
};
