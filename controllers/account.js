const dbHelper = require('../data/DbHelper');


module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const test = { state: "abc" };
    console.log(email);
    console.log(password);
    return res.json(test);
}