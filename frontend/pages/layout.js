import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar, Menu, Icon, Segment, Header } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const koyu_gri = '#D8D9CF';
const beyaz_gri = '#EDEDED';
const acik_pembe = '#FF8787';
const koyu_pembe = '#E26868';

var currentUser = {};
const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

const renderUserNameArea = (name) => {
  console.log(name);
  return <Header>{name}</Header>;
};

export default (props) => {
  const router = useRouter();
  useEffect(() => {
    const jsonObject = JSON.stringify({ userid: 2 });
    console.log(jsonObject);
    fetch('http://localhost:10500/account/current-user', {
      method: 'POST',
      headers: myHeaders,
      body: jsonObject,
    })
      .then((res) => res.json())
      .then((data) => {
        currentUser = data;
        console.log(currentUser.employee_name);
      });
  }, [currentUser]);
  return (
    <div>
      <Menu style={{ backgroundColor: beyaz_gri, margin: '0' }}>
        <Menu.Item name="Tekerek Sube" />
        <Menu.Menu position="right">
          <Menu.Item>{renderUserNameArea(currentUser.employee_name)}</Menu.Item>
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
          <Menu.Item
            as="a"
            style={{ color: koyu_gri }}
            onClick={() => {
              router.push('/home');
            }}
          >
            <Icon name="home" />
            Ana Sayfa
          </Menu.Item>
          <Menu.Item
            as="a"
            style={{ color: koyu_gri }}
            onClick={() => {
              router.push('/subeler');
            }}
          >
            <Icon name="shopping cart" />
            Şubeler
          </Menu.Item>
          <Menu.Item
            as="a"
            style={{ color: koyu_gri }}
            onClick={() => {
              router.push('/calisan');
            }}
          >
            <Icon name="id badge" />
            Çalışanlar
          </Menu.Item>
          <Menu.Item
            as="a"
            style={{ color: koyu_gri }}
            onClick={() => {
              router.push('/siparisler');
            }}
          >
            <Icon name="truck" />
            Siparişler
          </Menu.Item>
          <Menu.Item
            as="a"
            style={{ color: koyu_gri }}
            onClick={() => {
              router.push('/subeler');
            }}
          >
            <Icon name="clipboard list" />
            Satışlar
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic style={{ paddingRight: '170px' }}>
            {props.children}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};
