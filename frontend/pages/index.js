import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Segment,
  Grid,
  Form,
  Divider,
  Button,
  Card,
  Icon,
  Header,
  PopupContent,
} from 'semantic-ui-react';
const description = 'Lütfen Sistem Yöneticinizle İletişime Geçiniz..';
const myfunction = () => {
  console.log('asjkdna');
};
export default function Home() {
  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="semantic/dist/semantic.min.css"
      ></link>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Kullanıcı Adı"
                placeholder="Kullanıcı Adı"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Şifre"
                type="password"
              />

              <Button content="Giriş" primary fluid />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Card centered>
              <Card.Content header="Kayıt İçin" />
              <Card.Content description={description} />
              <Card.Content extra>
                <Icon name="mail" link onClick={myfunction} />
                {/* maili mavi yap */}
                admin@lorem.com
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>

        <Divider vertical>VEYA</Divider>
      </Segment>
    </div>
  );
}
