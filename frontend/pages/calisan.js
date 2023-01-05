import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Card,
  Image,
  Icon,
  Header,
  Container,
  Grid,
  Button,
} from 'semantic-ui-react';
import MainLayout from './layout';
const calisan_ismi = 'Polat ALEMDAR';
const meslek = 'Temizlikci';
const sube = 'Akmansoy';
const maas = 7000;
const cinsiyet = 'ERKEK';
const izinli_mesaji = 'XXXX Tarihine kadar izinli';

export default () => {
  return (
    <div>
      <Card centered style={{ marginTop: '3rem' }}>
        <Image
          src="https://64.media.tumblr.com/8bdfdc91727c878fda5663518897a26b/8a346e6666396b18-c4/s640x960/6309630712ed212729ee51956c0c24862bfc8847.jpg"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Description>
            <Grid reversed="tablet" columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Isim</Header>
                </Grid.Column>
                <Grid.Column>{calisan_ismi}</Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Cinsiyet </Header>
                </Grid.Column>
                <Grid.Column>{cinsiyet}</Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Sube</Header>
                </Grid.Column>
                <Grid.Column>{sube}</Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Maas </Header>
                </Grid.Column>
                <Grid.Column>{maas}</Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Durumu </Header>
                </Grid.Column>
                <Grid.Column>{izinli_mesaji}</Grid.Column>
              </Grid.Row>
            </Grid>
            {/* <Header as="h3" textAlign="right">
            isim: {calisan_ismi}
          </Header>
          <Header as="h3">meslek: {meslek}</Header>
          <Header as="h3">Şube: {sube}</Header>
          <Header as="h3">Maas : 2000 Amerikan Lirasi</Header> */}
          </Card.Description>

          {/* <Card.Description></Card.Description> */}
          {/* <Card.Description></Card.Description>
        <Card.Description></Card.Description> */}
        </Card.Content>
      </Card>
    </div>
  );
};
