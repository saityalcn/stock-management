const { Pool, Client } = require('pg');
let client;

module.exports.initDb = () => {
  client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'stock-management',
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
  const queryText = "select * from employees ORDER BY employee_id"
  return client.query(queryText);
};

module.exports.findEmployeeByEmail = (email) => {
  const queryText = 'select * from employees where email=$1';
  const values = [email];
  return client.query(queryText, values);
};

module.exports.getEmployeesWithBranches = (searchQuery) => {
  client.query('select * from awl_update()');
  if(searchQuery === undefined)
    searchQuery = " ";
  const queryText = "select * from employees, branches where branches.branch_id=employees.branch_id AND (employee_name LIKE $1 OR branch_name LIKE $2)ORDER BY employee_id";
  const values = ['%' + searchQuery + '%','%' + searchQuery + '%'];
  return client.query(queryText,values);
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
    "select order_id, product_name, amount,branch_name,order_date,estimated_shipment_date,order_state from orders, product_infos, branches where product_infos.info_id = orders.product_id AND branches.branch_id = orders.branch_id and order_state IS NULL OR order_state='Teslim Edilmedi'";
  return client.query(queryText);
};



module.exports.getProductsInfo = () => {
  const queryText = 'select info_id, product_name from product_infos';
  return client.query(queryText);
};

module.exports.addOrder = (obj) => {
  const queryText =
    "insert into orders(order_id,product_id,amount,branch_id,order_date,estimated_shipment_date, order_product_price, skt) VALUES (nextval('order_id_seq'),$1,$2,$3,CURRENT_DATE,$4,$5, $6)";
  const values = [
    obj.product_id,
    obj.amount,
    obj.branch_id,
    obj.estimated_shipment_date,
    obj.product_price,
    obj.skt
  ];
  return client.query(queryText, values);
};

module.exports.deleteOrder = (obj) => {
  const queryText = "delete from orders where product_id=$1 AND amount=$2 AND branch_id=$3 AND estimated_shipment_date=$4 AND skt=$5"
  const values = [
    obj.product_id,
    obj.amount,
    obj.branch_id,
    obj.estimated_shipment_date,
    obj.skt
  ];
  return client.query(queryText, values);
}

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

module.exports.getAllBranches = () => {
  const queryText = "select * from branches"
  return client.query(queryText);
}

module.exports.addEmployee = (employee) => {
  const queryText = "insert into employees(employee_id,employee_name, employee_salary,branch_id, email, user_password) values(nextval('employee_id_seq'),$1,$2,$3,$4,$5)";
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
    select * from products,product_infos,branches where products_infos_id = info_id AND branch_id = products_branch_id
    ORDER BY product_stock LIMIT 10 
  `
  return client.query(queryText);
}

module.exports.getProductsWithInfos = (branchId) => {
  const queryText = "SELECT * FROM products_with_infos where products_branch_id = $1";
  const values = [branchId];
  return client.query(queryText,values);
}


module.exports.getProducts = () => {
  const queryText = "SELECT * FROM products";
  return client.query(queryText);
}

module.exports.deleteProduct = (id) => {
  const queryText = "DELETE FROM products where products_id=$1";
  return client.query(queryText, [id]);
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

module.exports.getAllSales = () => {
  const queryText = "select * from sales";
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

module.exports.saveSale = (sale) => {
  const queryText = "insert into sales(sale_id,amount, sold_price, sold_date, sales_product_id) VALUES (nextval('sale_id_seq'),$1, $2, $3, $4)"
  const values = [sale.amount,sale.sold_price,sale.sold_date, sale.sales_product_id];
  return client.query(queryText, values);
}

module.exports.addProduct = (product) => {
  const queryText = "insert into products(products_id,products_branch_id,product_stock,product_skt,products_infos_id,discount_rate) VALUES (nextval('products_id_seq'),1, 100, '2024-02-15',2,0);"
  return client.query(queryText);
}

module.exports.deleteSale = (id) => {
  const queryText = "delete from sales where sale_id=$1";
  const values = [id];
  return client.query(queryText, values);
}

module.exports.addBranch = (branch) => {
  const queryText = "insert into branches(branch_id,branch_name, branch_address, branch_manager_pid) VALUES (nextval('branch_id_seq'),$1, $2, $3)"
  const values = [branch.branch_name, branch.branch_address,branch.branch_manager_pid];
  return client.query(queryText, values);
}

module.exports.updateEmployee = (employee) => {
  const queryText = "UPDATE employees SET employee_name = $1, employee_salary = $2, branch_id = $3, email = $4, user_password = $5 WHERE employee_id = $6;"
  const values = [employee.employee_name, employee.employee_salary, employee.branch_id, employee.email, employee.user_password, employee.employee_id];
  return client.query(queryText, values);
}


module.exports.findEmployeeById = (id) => {
  const queryText = 'select * from employees where employee_id=$1';
  const values = [id];
  return client.query(queryText, values);
};

module.exports.updateBranch = (branch) => {
  const queryText = "UPDATE branches SET branch_name = $1, branch_address = $2, branch_manager_pid = $3 WHERE branch_id = $4;";
  const values = [branch.branch_name, branch.branch_address, branch.branch_manager_pid, branch.branch_id];
  return client.query(queryText, values);
};

module.exports.findBranchById = (branchId) => {
  const queryText = 'SELECT * FROM branches WHERE branch_id = $1';
  const values = [branchId];
  return client.query(queryText, values);
};

module.exports.deleteBranchById = (branchId) => {
  const queryText = 'DELETE FROM branches WHERE branch_id = $1';
  const values = [branchId];
  return client.query(queryText, values);
};

module.exports.getAllOrders = () => {
  const queryText = 'select * from orders';
  return client.query(queryText);
};

module.exports.updateOrder = (order) => {
  const queryText = 'UPDATE orders SET product_id = $1, amount = $2, branch_id = $3, order_date = $4, estimated_shipment_date = $5, order_product_price = $6, skt = $7 WHERE order_id = $8';
  const values = [
    order.product_id,
    order.amount,
    order.branch_id,
    order.order_date,
    order.estimated_shipment_date,
    order.order_product_price,
    order.skt,
    order.order_id
  ];
  return client.query(queryText, values);
};

module.exports.findOrderById = (orderId) => {
  const queryText = 'SELECT * FROM orders WHERE order_id = $1';
  const values = [orderId];
  return client.query(queryText, values);
};

module.exports.updateSale = (sale) => {
  const queryText = 'UPDATE sales SET amount = $1, sold_price = $2, sold_date = $3, sales_product_id = $4 WHERE sale_id = $5';
  const values = [sale.amount, sale.sold_price, sale.sold_date, sale.sales_product_id, sale.sale_id];
  return client.query(queryText, values);
};

module.exports.findSaleById = (saleId) => {
  const queryText = 'SELECT * FROM sales WHERE sale_id = $1';
  const values = [saleId];
  return client.query(queryText, values);
};

module.exports.getAllProducts = () => {
  const queryText = 'SELECT * FROM products';
  return client.query(queryText);
};

module.exports.updateProduct = (product) => {
  const queryText = 'UPDATE products SET product_stock = $1, product_skt = $2, discount_rate = $3, products_branch_id = $4, products_infos_id = $5 WHERE products_id = $6';
  const values = [product.product_stock, product.product_skt, product.discount_rate, product.products_branch_id, product.products_infos_id, product.products_id];
  return client.query(queryText, values);
};

module.exports.findProductById = (productId) => {
  const queryText = 'SELECT * FROM products WHERE products_id = $1';
  const values = [productId];
  return client.query(queryText, values);
};
