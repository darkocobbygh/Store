const express= require('express');
const Product= require('../models/product')
const mongoose= require('mongoose');
const multer= require('multer');
const checkAuth=require('../middleware/check-auth');
const ProductController= require('../controllers/products.controllers');

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

const fileFilter= ((req,file,cb)=>{
    //Reject a file
    if(file.mimetype ==='image/jpeg' || file.mimetype=== 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
    
})

const upload= multer(
    {storage:storage, 
    limits: {
    fileSize: 1024*1024*5
    }, fileFilter: fileFilter
 })

const router= express.Router();

router.get('/',checkAuth, ProductController.product_get_all_products);

router.post('/',checkAuth,upload.single('productImage'),ProductController.products_create_products);

router.get('/:productId',checkAuth,ProductController.products_get_by_id);

router.patch('/:productId',checkAuth,ProductController.products_updates_products);

router.delete('/:productId',checkAuth,ProductController.products_deletes_products);

module.exports= router;