import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Segment, Card, Image, Button, Menu, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import MainLayout from './layout';

const koyu_gri = '#D8D9CF';
const beyaz_gri = '#EDEDED';
const acik_pembe = '#FF8787';
const koyu_pembe = '#E26868';
const sube_ismi = 'Tekerek Sube';
const address = 'akjdsnjkasdnajkadakjdsnjkasdnajkadakjdsnjkasdnajkad';
const calisan_sayisi = 10;
const mudur = 'Mehmet Mehmet';
const subelerimiz = [
  {
    branch_name: 'Tekerek Sube',
    branch_address: 'Haydar Bey Mah. ',
    calisan_sayisi: 5,
    mudur: 'Basel',
  },
  {
    branch_name: 'Bin Evler Sube',
    branch_address: 'BinEVler  Bey Mah. ',
    calisan_sayisi: 5,
    mudur: 'Basel',
  },
  {
    branch_name: 'Carsi Sube',
    branch_address: 'Trabzon Caddesi Bey Mah. ',
    calisan_sayisi: 5,
    mudur: 'Basel',
  },
];

const render_subeler = (subelerimiz) => {
  return subelerimiz.map((sube) => {
    return (
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header>{sube.branch_name}</Card.Header>
          {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
          <Card.Description style={{ overflowWrap: 'break-word' }}>
            {`Konum: ${sube.branch_address}`}
          </Card.Description>

          <Card.Description>{`Çalışan Kişi Sayısı: ${sube.calisan_sayisi}`}</Card.Description>
          <Card.Description>{`Şubenin Müdür: ${sube.mudur} `}</Card.Description>
        </Card.Content>
      </Card>
    );
  });
};

const subeler = () => {
  return  <MainLayout>
            <Card.Group>{render_subeler(subelerimiz)}</Card.Group>
          </MainLayout>;
};

export default subeler;
