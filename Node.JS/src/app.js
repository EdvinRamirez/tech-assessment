const express = require('express');
const app = express();
const orderRoutes = require("./Routes/Orders");

const PORT = process.env.PORT || 3000;

const orders = require('../data/orders.json')

app.use(express.json());

app.use("/orders", orderRoutes);

//Database
global.DBOrders = orders;


app.get('/health', (req, res) => {
   res.send('You keep using that word. I do not think it means what you think it means.');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;