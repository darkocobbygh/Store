const mongoose= require('mongoose');
const Order= require('../models/order');
const Product= require('../models/product');

module.exports={
    orders_get_all:(req,res)=>{
        Order.find()
        .populate('product')
        .exec()
        .then((docs)=>{
            res.status(200).json({
                count: docs.length,
                orders: docs.map((doc)=>{
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' +doc._id
                        }
                    }
                })
            })
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    },
    orders_create_orders:(req,res)=>{
        Product.findById(req.body.productId)
        .then((product)=>{
            if(!product){
                return res.status(404).json({
                    message: 'Product not found'
                })
            }
            const order=new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
           return order.save()
            .then((result)=>{
                console.log(result)
                res.status(200).json({
                    message: 'Order stored',
                    createdOrder: {
                        _id: result._id,
                        quantity: result.quantity,
                        product: result.product
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' +result.id
                    }
                });
                console.log('orders POST route')
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({
                    message: 'Product not found',
                    error: err
                })
            })
        })  
    },
    orders_get_order:(req,res)=>{
        Order.findById(req.params.orderId)
        .exec()
        .then((order)=>{
            if(!order){
                return res.status(404).json({
                    message: 'Order not found'
                })
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error: err
            })
        })
    },
    orders_delete_order:(req,res)=>{
        Order.remove({_id: req.params.orderId})
        .exec()
        .then((result)=>{
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost/3000/orders',
                    body: {productId: 'ID', quantity: 'Number'}
                }
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error: err
            })
        })
    }
}


