const express= require('express');
const router= express.Router();
const OrderControllers= require('../controllers/orders.controllers');
const checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth, OrderControllers.orders_get_all);
router.post('/',checkAuth,OrderControllers.orders_create_orders);
router.get('/:orderId',checkAuth,OrderControllers.orders_get_order);
router.delete('/:orderId',checkAuth,OrderControllers.orders_delete_order);

module.exports= router;