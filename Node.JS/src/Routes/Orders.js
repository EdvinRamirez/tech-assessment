const express = require('express');
const router = express.Router();

//Getting all the orders
router.get("/", (req, res) => {
    res.send(global.DBOrders);
});

//creating and pushing an order on DB
router.post("/newOrder", (req, res) => {
    let order = req.body;
    global.DBOrders.push(order);
    res.send(order);
})

//Getting all orders for a specific customer 
router.get("/customer/:Customer", (req, res) => {
    let customerId = req.params.Customer;
    let results = global.DBOrders.filter(x => x.CustomerPhoneNumber ===customerId)

    if (results.length)
    {
        res.send(results);
    }
    else
    {
        res.status(500).json({error: "No Customer order found"});
    }
});


//Updating specific order with new product 
router.post("/updateOrder/:orderNumber/:newItem", (req, res) => {
    let orderNumber = req.params.orderNumber;
    let newItem  = req.params.newItem;

    let index = global.DBOrders.findIndex(element => {
        return element.OrderNumber === orderNumber;
    })

    if (index != -1)
    {
        global.DBOrders[index].Product = newItem;
        res.send("Order Updated Successfully");
    }
    else
    {
        res.status(500).json({error:"Order not found"})
    }
   
});

//Canceling/Deleting an order
router.delete("/delete/:orderNumber", (req, res) => {
    let orderNumber = req.params.orderNumber;

    let index = global.DBOrders.findIndex(element => {
        return element.OrderNumber === orderNumber;
    })

    if (index != -1)
    {
        global.DBOrders.splice(index, 1);
        res.send("Order Canceled Successfully");
    }
    else
    {
        res.status(500).json({error:"Order not found"});
    }
})


module.exports = router;