import {React, useEffect, useState, useCallback} from 'react';
import 'semantic-ui-css/semantic.min.css';
import Siparis from './siparis';
import Indirimler from './indirimler';
import AzStok from './stoguazalan';
import {
    Form
} from 'semantic-ui-react';
import MainLayout from './layout';
import { useRouter } from 'next/router';


let options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
];

let secilen_sube_id;

const myHeaders = new Headers({
  'Content-Type': 'application/json'
});


export default () => {
  const router = useRouter();
    const sendAddEmployeeRequest = useCallback(async (event) => {
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const branchId = secilen_sube_id;
        const salary = event.target.salary.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = firstName + " " + lastName;
        const jsonObject = JSON.stringify({
            employee_name: name,
            branch_id: branchId,
            employee_salary: salary,
            email: email,
            user_password: password
          });
          console.log(jsonObject);
        const response = await fetch('http://localhost:10500/add-employee', {method: "POST", headers: myHeaders, body: jsonObject});
        const jsonResponse = await response.json();
        router.push('/calisanlar');
      }, []);
    
    const [data, setData] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:10500/branches`)
        .then((res) => res.json())
        .then((data) => {
            setData(true);
            const subeler = data.branches;
            options = subeler.map((element) => ({
            key: element.branch_id,
            text: element.branch_name,
            value: element.branch_id,
            }));
            console.log(subeler);
        });
    }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="semantic/dist/semantic.min.css"
      ></link>
      <MainLayout>
      <Form onSubmit={sendAddEmployeeRequest}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='İsim' placeholder='Çalışan İsmi Giriniz' name="firstName"/>
          <Form.Input fluid label='Soyisim' placeholder='Çalışan Soyismi Giriniz' name="lastName"/>
        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Select label="Şubeler" placeholder='Şube Seçiniz' options={options} onChange={(e,data) => {secilen_sube_id = data.value;}} ></Form.Select>
        <Form.Input fluid label='Maaş' placeholder='2876.54' name="salary" type='number'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='E-Posta' name="email" placeholder='example@example.com' />
          <Form.Input fluid label='Password'name="password" placeholder='' type='password'/>
        </Form.Group>
        <Form.Button type='submit' primary>Ekle</Form.Button>
      </Form>
      </MainLayout>
    </div>
  );
};
