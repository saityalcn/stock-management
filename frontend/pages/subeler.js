import React, { use, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react'
import { Grid, Segment, Card, Image, Button, Menu, Icon } from 'semantic-ui-react';
import MainLayout from './layout';
import { useRouter } from 'next/router';

const koyu_gri = '#D8D9CF';
const beyaz_gri = '#EDEDED';
const acik_pembe = '#FF8787';
const koyu_pembe = '#E26868';
const sube_ismi = 'Tekerek Sube';
const address = 'akjdsnjkasdnajkadakjdsnjkasdnajkadakjdsnjkasdnajkad';
const calisan_sayisi = 10;
const mudur = 'Mehmet Mehmet';


const render_subeler = (subelerimiz) => {
  const router = useRouter();
  return subelerimiz.map((sube) => {
    console.log(sube)
    return (
      <Card onClick={()=>{router.push({pathname: 'sube', query: {branch_id: sube.branch_id}});}}>
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

          <Card.Description>{`Çalışan Kişi Sayısı: ${sube.branch_manager_pid}`}</Card.Description>
          <Card.Description>{`Şubenin Müdür İsmi: ${sube.employee_name} `}</Card.Description>
        </Card.Content>
      </Card>
    );
  });
};

const subeler = () => {
 const [subelerimiz, set_subelerimiz] = useState([]); 
  useEffect(() => {
    fetch('http://localhost:10500/branches')
      .then((res) => res.json())
      .then((data) => {
        set_subelerimiz(data);
        data.map(element => {
          //subelerimiz .push({branch_id: element.branch_id, branch_name: element.branch_name, branch_address:element.branch_address, branch_manager_pid: element.branch_manager_pid});
        })
        console.log(subelerimiz)
      })
  }, []);

  return  <MainLayout>
            <Card.Group>{render_subeler(subelerimiz)}</Card.Group>
          </MainLayout>;
};

export default subeler;
