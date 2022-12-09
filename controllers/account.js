const dbHelper = require('../data/DbHelper');

module.exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);

  dbHelper
    .findEmployeeByEmail(email)
    .then((result) => {
      // bcrypt.compare(password, employee.password, (err,result) => {});
      const employee = result.rows[0];
      if (employee != null) {
        if (employee.user_password === password) {
          return res.send({
            isAuthenticated: true,
            userId: employee.employee_id,
          });
        } else {
          return res.send({
            isAuthenticated: false,
            message: 'Wrong Password',
          });
        }
      } else {
        return res.send({ isAuthenticated: false, message: 'Wrong Email' });
      }
    })
    .catch((err) => {
      res.send({ error: true });
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.body.userid;
  console.log(userId);
  dbHelper
    .getCurrentUser(userId)
    .then((result) => {
      const currentUser = result.rows[0];
      console.log(currentUser);
      res.send(currentUser);
    })
    .catch((err) => {
      console.log(err);
    });
};
