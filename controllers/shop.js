const dbHelper = require('../data/DbHelper');


module.exports.getEmployees = (req, res, next) => {
    dbHelper.getEmployeesWithBranches().then(result => {
        const data = result.rows.map(element => formatEmployee(element));
        console.log(data);
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
}

module.exports.deleteEmployee = (req,res,next) => {
    const employeeId = req.body.employeeid;
    dbHelper.deleteEmployeeById(employeeId).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
}

module.exports.getOrders = (req, res, next) => {
  dbHelper
    .getOrders()
    .then((result) => {
      const map = {
        orders: result.rows.map((element) => formatOrder(element)),
      };
      res.send(map);
    }).catch((err) => {
      console.log(err);
    });
};

module.exports.getBranches = (req, res, next) => {
    dbHelper.getBranches().then(result => {
        const branches = result.rows; 
        console.log(branches);
        res.send(branches);
    }).catch(err => {
        console.log(err);
    })
}

module.exports.getBranch = (req, res, next) => {
    const branchId = req.params.branchid;
    dbHelper.getBranchById(branchId).then(result => {

        const branch = result.rows[0]; 
        console.log(branch);
        res.send(branch);
    }).catch(err => {
        console.log(err);
    })
}

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

function formatEmployee(element) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.NumberFormat('tr-TR', {style: 'currency',currency: 'TRY',});
    return {
        employee_id: element.employee_id,
        employee_name: element.employee_name,
        employee_salary: formatter.format(element.employee_salary),
        awl: element.awl,
        awl_date: element.awl_date.toLocaleDateString("tr-TR",options),
        branch_name: element.branch_name
    }
}
