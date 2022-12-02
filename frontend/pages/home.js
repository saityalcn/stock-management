import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Siparis from './siparis';
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
      <Menu style={{ backgroundColor: beyaz_gri, margin: '0' }}>
        <Menu.Item name={sube} />
        <Menu.Menu position="right">
          <Menu.Item name={isim} />

          <Menu.Item>
            <Icon name="log out" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Sidebar.Pushable
        as={Segment}
        style={{ backgroundColor: koyu_gri, margin: '0' }}
      >
        <Sidebar
          as={Menu}
          animation="push"
          direction="left"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
          style={{ backgroundColor: koyu_pembe }}
        >
          <Menu.Item as="a" style={{ color: koyu_gri }}>
            <Icon name="home" />
            Ana Sayfa
          </Menu.Item>
          <Menu.Item as="a" style={{ color: koyu_gri }}>
            <Icon name="shopping cart" />
            Şubeler
          </Menu.Item>
          <Menu.Item as="a" style={{ color: koyu_gri }}>
            <Icon name="truck" />
            Siparişler
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            
            <Header as="h2">Siparişler</Header>
            <Siparis></Siparis>

            {/* </Container> */}

            {/* <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" /> */}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};
