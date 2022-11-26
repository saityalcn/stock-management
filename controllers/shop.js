const dbHelper = require('../data/DbHelper');

module.exports.getIndex = (req, res, next) => {
    dbHelper.getEmployee().then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
    });
}