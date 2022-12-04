const { Pool, Client } = require('pg');
let client;

module.exports.initDb = () => {
  client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'stock-management',
    port: '5432',
    password: '1612',
  });

  return client.connect();
};

// Orders
module.exports.getOrders = () => {
    return client.query("select order_id, product_name, amount,branch_name,order_date,estimated_shipment_date,order_state from orders, product_infos, branches where product_infos.product_id = orders.product_id AND branches.branch_id = orders.branch_id ");
}

module.exports.updateOrderState = (orderId) => {
    const queryText = "update orders set order_state='Teslim Edildi' where order_id=$1"
    const values = [orderId];
    return client.query(queryText,values);
}


// Employee
module.exports.getEmployees = () => {
  return client.query('select * from employees');
};

module.exports.findEmployeeByEmail = (email) => {
    const queryText = "select * from employees where email=$1"
    const values = [email];
    return client.query(queryText,values);
}

module.exports.getCurrentUser = (employeeId) => {
    const queryText = "select * from employees where employee_id=$1"
    const values = [employeeId];
    return client.query(queryText,values);
}