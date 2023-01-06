const { Pool, Client } = require('pg');
let client;

module.exports.initDb = () => {
  client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'stock_management',
    port: '5432',
    password: 'aag',
  });

  return client.connect();
};

// Orders
module.exports.getOrders = () => {
  return client.query(
    'select order_id, product_name, amount,branch_name,order_date,estimated_shipment_date,order_state from orders, product_infos, branches where product_infos.info_id = orders.product_id AND branches.branch_id = orders.branch_id '
  );
};

module.exports.updateOrderState = (orderId) => {
  const queryText =
    "update orders set order_state='Teslim Edildi' where order_id=$1";
  const values = [orderId];
  return client.query(queryText, values);
};

// Employee
module.exports.getEmployees = () => {
  const queryText = "select * from employees"
  return client.query(queryText);
};

module.exports.findEmployeeByEmail = (email) => {
  const queryText = 'select * from employees where email=$1';
  const values = [email];
  return client.query(queryText, values);
};

module.exports.getEmployeesWithBranches = () => {
  client.query('select * from awl_update()');
  const queryText = 'select * from employees, branches where branches.branch_id=employees.branch_id';
  return client.query(queryText);
};

module.exports.deleteEmployeeById = (employeeId) => {
  const queryText = "delete from employees where employee_id=$1";
  const values = [employeeId];
  return client.query(queryText, values);
}

module.exports.getCurrentUser = (employeeId) => {
  const queryText = 'select * from employees where employee_id=$1';
  const values = [employeeId];
  return client.query(queryText, values);
};

module.exports.getUndelieveredOrders = () => {
  const queryText =
    "select order_id, product_name, amount,branch_name,order_date,estimated_shipment_date,order_state from orders, product_infos, branches where product_infos.info_id = orders.product_id AND branches.branch_id = orders.branch_id and order_state = 'Teslim Edilmedi' ";
  return client.query(queryText);
};



module.exports.getProductsInfo = () => {
  const queryText = 'select info_id, product_name from product_infos';
  return client.query(queryText);
};

module.exports.addOrder = (obj) => {
  console.log(obj);
  const queryText =
    "insert into orders(order_id,product_id,amount,branch_id,order_date,estimated_shipment_date) VALUES (nextval('order_id_seq'),$1,$2,$3,$4,$5)";
  const values = [
    obj.info_id,
    obj.amount,
    obj.branch_id,
    '2001-06-21',
    obj.estimated_shipment_date,
  ];
  return client.query(queryText, values);
};

//const queryText = "insert into employees(employee_id,employee_name, employee_salary,branch_id, email, user_password)
//values(nextval('employee_id_sequence'),$1,$2,$3,$4,$5)";

module.exports.getBranches = () => {
  const queryText = "select br.branch_id, br.branch_address, br.branch_manager_pid,emp.employee_name ,br.branch_name, count(*) number_of_employees from branches as br ,employees as emp where  br.branch_manager_pid = emp.employee_id group by br.branch_id, br.branch_manager_pid,br.branch_address,br.branch_name,emp.employee_name"
  return client.query(queryText);
}
module.exports.getBranchById = (branchId) => {
  const queryText = "select br.branch_id, br.branch_address, br.branch_manager_pid, emp.employee_name ,br.branch_name, count(*) number_of_employees from branches as br ,employees as emp where br.branch_id = $1 and br.branch_manager_pid = emp.employee_id group by br.branch_id, br.branch_manager_pid,br.branch_address,br.branch_name,emp.employee_name"
  const values = [branchId];
  return client.query(queryText,values);
}

module.exports.addEmployee = (employee) => {
  const queryText = "insert into employees(employee_id,employee_name, employee_salary,branch_id, email, user_password) values(nextval('employee_id_sequence'),$1,$2,$3,$4,$5)";
  const values = [employee.employee_name, employee.employee_salary, employee.branch_id, employee.email, employee.user_password];
  return client.query(queryText,values);
}

module.exports.setAwlForEmployee = (employeeId, date) => {
  const queryText = "update employees set awl=true, awl_date=$1 where employee_id=$2";
  const values = [date,employeeId];
  return client.query(queryText,values);
}

module.exports.getLeastStockProducts = () => {
  const queryText = `
    select * from products, product_infos,branches where product_stock < 10 
    INTERSECT
    select * from products,product_infos,branches where products_id = info_id AND branch_id = products_branch_id
    ORDER BY product_stock LIMIT 10 
  `
  return client.query(queryText);
}

module.exports.getProductsWithInfos = (branchId) => {
  const queryText = "SELECT * FROM products_with_infos where products_branch_id = $1";
  const values = [branchId];
  return client.query(queryText,values);
}
module.exports.getEmployeesFromBranch = (branchId) => {
  const queryText = "SELECT * FROM employees where branch_id = $1";
  const values = [branchId];
  return client.query(queryText,values);
}

module.exports.getSales = () => {
  const queryText = `select * from sales, products,product_infos,branches where sales_product_id = products_id and products_infos_id = info_id and products_branch_id = branch_id and sold_date IN(
		select sold_date from sales GROUP BY sales.sold_date having (date_part('year', sold_date) > date_part('year', CURRENT_DATE)-1))`;
  return client.query(queryText);
}

module.exports.getDiscounts = () => {
  const queryText = "select * from get_products_with_discount(), branches where products_branch_id=branch_id AND discount_rate > 0";
  return client.query(queryText);
}

module.exports.addDiscount = (productId, discountRate) => {
  const queryText = "update products set discount_rate=$1 where products_id=$2";
  const values=[discountRate, productId];
  return client.query(queryText,values);
} 

module.exports.cancelDiscount = (productId) => {
  const queryText = "update products set discount_rate=0 where products_id=$1";
  const values=[productId];
  return client.query(queryText,values);
} 

module.exports.addSale = (infoId, branchId,amount) => {
  const queryText = "select * from sales_operator($1,$2,$3)";
  const values = [branchId,infoId,amount];
  return client.query(queryText, values);
}