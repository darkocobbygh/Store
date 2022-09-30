const express= require('express');
const dotenv=require('dotenv').config();
const productRoutes= require('./api/routes/products');
const orderRoutes= require('./api/routes/orders');
const userRoutes=require('./api/routes/user')
const morgan= require('morgan');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const app= express();

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',userRoutes)

app.use((req,res,next)=>{
    const error= new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports= app;