const express = require('express');
const shopRoutes = require('./routes/shop');
const app = express();


app.use(shopRoutes);

app.listen(3000);