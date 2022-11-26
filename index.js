const express = require('express');
const shopRoutes = require('./routes/shop');
const app = express();
const dbHelper = require('./data/DbHelper');


app.use(shopRoutes);

dbHelper.initDb().then(res => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})