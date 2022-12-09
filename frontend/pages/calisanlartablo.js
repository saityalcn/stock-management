import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Form, Visibility, Icon, Label,Modal, Header, Image, Grid } from 'semantic-ui-react';
import { useEffect } from 'react'
import { useState,useCallback } from 'react';
import Calisan from './calisan';

let calisanlar = [];
let orderId;
let interval;
const calisan_ismi = 'Polat ALEMDAR';
const meslek = 'Temizlikci';
const sube = 'Akmansoy';
const maas = 7000;
const cinsiyet = 'ERKEK';
const izinli_mesaji = 'XXXX Tarihine kadar izinli';
var secilen_calisan = {};
const myHeaders = new Headers({
  'Content-Type': 'application/json'
});

//TODO siparis gelirse o satiri disable edip yesile boya,

const render_calisanlar = (calisanlar) => {
    const [isSending, setIsSending] = useState(false);
    const [open, setOpen] = React.useState(false);
    const sendRequest = useCallback(async (event) => {
      if (isSending) return;
      setIsSending(true);
      const jsonObject = JSON.stringify({orderid: orderId});
      console.log(jsonObject);
      const response = await fetch('http://localhost:10500/update-order-state', {method: "POST", headers: myHeaders, body:jsonObject});
      //jsonResponse = await response.json();
      //console.log(jsonResponse);
      window.location.reload(false);
      setIsSending(false)
    }, [isSending]);


    return calisanlar.map((calisan) => {
        console.log(calisan);
        const flag = true;
      return (
        <Table.Row>
            <Table.Cell>{calisan.employee_id}</Table.Cell>
            <Table.Cell>{calisan.branch_name}</Table.Cell>
            <Table.Cell>{calisan.employee_name}</Table.Cell>
            <Table.Cell>{calisan.employee_salary}</Table.Cell>
            <Table.Cell>{calisan.awl_date}</Table.Cell>
            <Table.Cell>
                <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                <Button animated='fade' primary onClick={() => {secilen_calisan = calisan}}>
                    <Button.Content visible>Detay</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
                }>
                    <Modal.Header>Çalışan Detay</Modal.Header>
                    <Modal.Content image>
                        <Image size='medium' src='https://64.media.tumblr.com/8bdfdc91727c878fda5663518897a26b/8a346e6666396b18-c4/s640x960/6309630712ed212729ee51956c0c24862bfc8847.jpg' wrapped />
                        <Modal.Description>
                            <Grid reversed="tablet" columns="equal">
                            <Grid.Row>
                                <Grid.Column>
                                <Header as="h3">İsim</Header>
                                </Grid.Column>
                                <Grid.Column>{secilen_calisan.employee_name}</Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                <Header as="h3">Cinsiyet </Header>
                                </Grid.Column>
                                <Grid.Column>{secilen_calisan.employee_id}</Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                <Header as="h3">Şube</Header>
                                </Grid.Column>
                                <Grid.Column>{secilen_calisan.branch_name}</Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                <Header as="h3">Maaş </Header>
                                </Grid.Column>
                                <Grid.Column>{secilen_calisan.employee_salary}</Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                <Header as="h3">Durumu </Header>
                                </Grid.Column>
                                <Grid.Column>{secilen_calisan.awl}</Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                <Header as="h3">İzin Bitiş </Header>
                                </Grid.Column>
                                <Grid.Column>{secilen_calisan.awl_date}</Grid.Column>
                            </Grid.Row>
                            </Grid>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setOpen(false)}>Geri Dön</Button>
                    </Modal.Actions>
                </Modal>

            </Table.Cell>
            <Table.Cell>
            <Button inverted color='red' onClick>
                <Icon name='remove' />
                    Kaldır
            </Button>
            </Table.Cell>
        </Table.Row>
      );
    });
};

function siparis_table(){
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:10500/employees')
      .then((res) => res.json())
      .then((data) => {
        setData(orderId)
        console.log(data);
        calisanlar = data;
        setLoading(false)
      })
  }, [calisanlar]);
  
  return (
    <Table unstackable padded style={{ width: 'calc(100% - 150px)' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Şube</Table.HeaderCell>
          <Table.HeaderCell>Çalışan İsim</Table.HeaderCell>
          <Table.HeaderCell>Çalışan Maaş</Table.HeaderCell>
          <Table.HeaderCell>Çalışan İzin Bitiş</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell> </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{render_calisanlar(calisanlar)}</Table.Body>
    </Table>
  );
};

export default siparis_table;
