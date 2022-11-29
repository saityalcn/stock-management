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

module.exports.getOrders = () => {
    return client.query("select order_id, product_name, amount,branch_name,order_date,estimated_shipment_date,order_state from orders, product_infos, branches where product_infos.product_id = orders.product_id AND branches.branch_id = orders.branch_id ");
}