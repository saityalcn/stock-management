const dbHelper = require('../data/DbHelper');

module.exports.getIndex = (req, res, next) => {
    dbHelper.getEmployees().then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
    });
}

module.exports.getOrders = (req, res, next) => {
    console.log('get orders');
    dbHelper.getOrders().then(result => {
        console.log(result);
        const map = {
            orders: result.rows.map(element => formatOrder(element))
        };
        res.send(map);
    }).catch(err => {
        console.log(err);
    })
}


function formatOrder(element){
    return {
        order_id: element.order_id,
        product_name: element.product_name,
        amount: element.amount,
        branch_name: element.branch_name,
        order_date:element.order_date.toLocaleDateString("tr-TR"),
        estimated_shipment_date: element.estimated_shipment_date.toLocaleDateString("tr-TR"),
        order_state: element.order_state
    }
}