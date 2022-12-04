import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Siparis from './siparis';
import Indirimler from './indirimler';
import AzStok from './stoguazalan';
import {
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Input,
  Dropdown,
  Container,
} from 'semantic-ui-react';
import MainLayout from './layout';


let isim = 'Mehmet Mehmet';
let sube = 'Tekerek sube';
const koyu_gri = '#D8D9CF';
const beyaz_gri = '#EDEDED';
const acik_pembe = '#FF8787';
const koyu_pembe = '#E26868';
export default () => {
  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="semantic/dist/semantic.min.css"
      ></link>
        <MainLayout>
              <Header as="h2">Stoğu Azalan Ürünler</Header>
              <AzStok></AzStok>

              <Header as="h2">İndirimler</Header>
              {/* <Container fluid> */}
              <Indirimler></Indirimler>

              <Header as="h2">Beklenen Siparişler</Header>
              <Siparis></Siparis>

              {/* </Container> */}

              {/* <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" /> */}

        </MainLayout>
    </div>
  );
};
