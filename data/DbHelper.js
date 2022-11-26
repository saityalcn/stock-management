const { Pool, Client } = require('pg');
let client;

module.exports.initDb = () => {
    client = new Client({
        user: "postgres",
        host: "127.0.0.1",
        database: "stock-management",
        port: "5432",
        password: "123123123"
    });

    return client.connect();
}

module.exports.getEmployees = () => {
    return client.query("select * from employees");
}