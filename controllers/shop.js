const { reset } = require('nodemon');
const dbHelper = require('../data/DbHelper');


module.exports.getEmployees = (req, res, next) => {
  const searchQuery = req.query.q;
  dbHelper.getEmployeesWithBranches(searchQuery).then(result => {
      const data = result.rows.map(element => formatEmployee(element));
      res.send(data);
  }).catch(err => {
      console.log(err);
  });
}

module.exports.postAddEmployee = (req, res,next) => {
    const employee = req.body;
    dbHelper.addEmployee(employee).then(result => {
      res.send(result);
    }).catch(err => {
      console.log(err);
    })
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

module.exports.getProductsWithInfos = (req, res, next) => {
  const branch_id = req.params.branchid;
  dbHelper
    .getProductsWithInfos(branch_id)
    .then((result) => {
      const map = {
        products_with_infos: result.rows.map(element=>formatProduct(element))
      };
      res.send(map);
    }).catch((err) => {
      console.log(err);
    });
};
module.exports.getEmployeesFromBranch = (req, res, next) => {
  const branch_id = req.params.branchid;
  dbHelper
    .getEmployeesFromBranch(branch_id)
    .then((result) => {
      const map = {
        employees_from_branch: result.rows.map(element=>formatEmployee(element))
      };
      res.send(map);
    }).catch((err) => {
      console.log(err);
    });
};

module.exports.getBranch = (req, res, next) => {
    const branchId = req.params.branchid;
    dbHelper.getBranchById(branchId).then(result => {
        const branch = result.rows[0]; 
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
      res.send(result);
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

module.exports.setAwl = (req,res,next) => {
  const employeeId = req.body.employeeId; 
  const date = req.body.awl_date;
  dbHelper.setAwlForEmployee(employeeId, date).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err);
  })
}

module.exports.getLeastStockProducts = (req,res,next) => {
  dbHelper.getLeastStockProducts().then(result => {
    const map = result.rows.map(element => formatProduct(element));
    res.send(map);
  }).catch(err => console.log(err));
}


module.exports.getProductsInfo = (req, res) => {
  dbHelper
    .getProductsInfo()
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.addOrder = (req, res) => {
  console.log(req.body);
  dbHelper
    .addOrder(req.body)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getSales = (req,res,next) => {
  dbHelper.getSales().then(result =>{ 
    const map = result.rows.map(element => formatSale(element));
    res.send(map);
  }).catch(err => {
    console.log(err);
  })
}

module.exports.getDiscounts = (req,res,next) => {
  dbHelper.getDiscounts().then(result => {
    const map = result.rows.map(element => formatProduct(element));
    res.send(map);
  })
}

module.exports.postAddDiscount = (req,res,next) => {
  const productId = req.body.product_id;
  const discountRate = req.body.discount_rate;
  dbHelper.addDiscount(productId, discountRate).then(result => {
    res.send(result);
  }).catch(err=> {
    console.log(err);
    res.send(err)});
}

module.exports.postCancelDiscount = (req,res,next) => {
  const productId = req.body.product_id;
  dbHelper.cancelDiscount(productId).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err);
  });
}

module.exports.postAddSale = (req,res,next) => {
  const infoId = req.body.info_id;
  const branchId = req.body.branch_id;
  const amount = req.body.amount;
  console.log(infoId);
  console.log(branchId);
  console.log(amount);
  dbHelper.addSale(infoId, branchId, amount).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err);
  });
}


function formatOrder(element) {
  return {
    order_id: element.order_id,
    product_name: element.product_name,
    amount: element.amount,
    branch_name: element.branch_name,
    order_date: element.order_date.toLocaleDateString('tr-TR'),

    estimated_shipment_date: element.estimated_shipment_date
      ? element.estimated_shipment_date.toLocaleDateString('tr-TR')
      : '',
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
        awl: (element.awl == false) ? "İzinli Değil":"İzinli",
        awl_date: (element.awl_date == undefined ) ? "Yok":element.awl_date.toLocaleDateString("tr-TR",options),
        branch_name: element.branch_name
    }
}

function formatProduct(element) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatter = new Intl.NumberFormat('tr-TR', {style: 'currency',currency: 'TRY',});
  return {
      products_id: element.products_id,
      product_name: element.product_name,
      product_price: formatter.format(element.product_price),
      product_skt: element.product_skt.toLocaleDateString("tr-TR",options),
      product_stock: element.product_stock,
      branch_name: element.branch_name,
      products_infos_id: element.products_infos_id,
  }
}

function formatSale(element) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatter = new Intl.NumberFormat('tr-TR', {style: 'currency',currency: 'TRY',});
  return {
      sale_id: element.sale_id,
      amount: element.amount,
      sold_price: formatter.format(element.sold_price),
      sold_date: element.sold_date.toLocaleDateString("tr-TR",options),
      product_stock: element.product_stock,
      branch_name: element.branch_name,
      product_name: element.product_name
  }
}