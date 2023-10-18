const request = require('supertest');
const app = require('../app');

test('Should return 200 status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
});

test('Test response text', async () => {
    const response = await request(app).get('/health');
    expect(response.text).toBe('You keep using that word. I do not think it means what you think it means.');
})


//Testing Order Endpoint
test('Should return 200 status', async () => {
    const response = await request(app).get('/orders');
    expect(response.statusCode).toBe(200);
});

//Testing for creating an order 
test('Should return 200 status', async () => {

    let neworder = {
        OrderNumber: "5",
        Product: "Monitor",
        CustomerPhoneNumber: "2125551234"
    }

    const response = await request(app).post('/orders/newOrder').send(neworder);
    expect(response.statusCode).toBe(200);
});

test('Test response text', async () => {

    let neworder = {
        OrderNumber: "5",
        Product: "Monitor",
        CustomerPhoneNumber: "2125551234"
    }

    const response = await request(app).post('/orders/newOrder').send(neworder);
    expect(response.text).toBe(JSON.stringify(neworder));
});


//Testing for listing order for customer
test('Should return 200 status', async () => {
    const response = await request(app).get('/orders/customer/2125554567');
    expect(response.statusCode).toBe(200);
});

test('Should return 500 status', async () => {
    const response = await request(app).get('/orders/customer/21255545673232');
    expect(response.statusCode).toBe(500);
});

test('Test response text', async () => {
    const response = await request(app).get('/orders/customer/2125554567');
    expect(response.text).toBe("[{\"OrderNumber\":\"2\",\"Product\":\"TV\",\"CustomerPhoneNumber\":\"2125554567\"}]");
});


//Testing for updating order
test('Should return 200 status', async () => {
    const response = await request(app).post('/orders/updateOrder/1/PlushDoll');
    expect(response.statusCode).toBe(200);
});

test('Should return 500 status', async () => {
    const response = await request(app).post('/orders/updateOrder/99/PlushDoll');
    expect(response.statusCode).toBe(500);
});

test('Test response text', async () => {
    const response = await request(app).post('/orders/updateOrder/1/BigDollHouse');
    expect(response.text).toBe("Order Updated Successfully");
});

test('Test response text', async () => {
    const response = await request(app).post('/orders/updateOrder/99/BigDollHouse');
    expect(response.text).toBe('{"error":"Order not found"}');
});

//Testing for Canceling/Deleting order
test('Should return 200 status', async () => {
    const response = await request(app).delete('/orders/delete/1');
    expect(response.statusCode).toBe(200);
});

test('Should return 500 status', async () => {
    const response = await request(app).delete('/orders/delete/99');
    expect(response.statusCode).toBe(500);
});

test('Test response text', async () => {
    const response = await request(app).delete('/orders/delete/2');
    expect(response.text).toBe("Order Canceled Successfully");
});

test('Test response text', async () => {
    const response = await request(app).delete('/orders/delete/99');
    expect(response.text).toBe('{"error":"Order not found"}');
});
