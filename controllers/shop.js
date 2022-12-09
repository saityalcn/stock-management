const dbHelper = require('../data/DbHelper');

module.exports.getIndex = (req, res, next) => {
  dbHelper
    .getEmployees()
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getOrders = (req, res, next) => {
  dbHelper
    .getOrders()
    .then((result) => {
      const map = {
        orders: result.rows.map((element) => formatOrder(element)),
      };
      res.send(map);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getBranches = (req, res) => {
  dbHelper
    .getBranches()
    .then((result) => {
      const map = {
        branches: result.rows.map((element) => formatBranch(element)),
      };
      res.send(map);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postUpdateOrderState = (req, res, next) => {
  const orderId = req.body.orderid;
  dbHelper
    .updateOrderState(orderId)
    .then((result) => {
      res.send();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getUndelieveredOrders = (req, res) => {
  console.log('ndsjad');
  dbHelper
    .getUndelieveredOrders()
    .then((result) => {
      const map = {
        orders: result.rows.map((element) => formatOrder(element)),
      };
      res.send(map);
    })
    .catch((err) => {
      console.log(err);
    });
};

function formatOrder(element) {
  return {
    order_id: element.order_id,
    product_name: element.product_name,
    amount: element.amount,
    branch_name: element.branch_name,
    order_date: element.order_date.toLocaleDateString('tr-TR'),
    estimated_shipment_date:
      element.estimated_shipment_date.toLocaleDateString('tr-TR'),
    order_state: element.order_state,
  };
}

function formatBranch(element) {
  return {
    branch_id: element.branch_id,
    branch_name: element.branch_name,
    branch_address: element.branch_address,
    employee_name: element.employee_name,
  };
}
