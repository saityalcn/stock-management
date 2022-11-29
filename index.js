const express = require('express');
const shopRoutes = require('./routes/shop');
const accountRoutes = require('./routes/account');
const app = express();
const dbHelper = require('./data/DbHelper');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(bodyParser.json());

app.use(shopRoutes);
app.use('/account', accountRoutes);

dbHelper.initDb().then(res => {
    console.log("Listening On 4500");
    app.listen(10500);
}).catch(err => {
    console.log(err);
})