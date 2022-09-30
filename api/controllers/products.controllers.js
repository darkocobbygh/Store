const mongoose=require('mongoose')
const Product= require('../models/product');

module.exports={
    product_get_all_products:(req,res)=>{
        Product.find()
        .exec()
        .then((result)=>{
                const response= {
                    count: result.length,
                    products: result.map(red=>{
                       return {
                            name: red.name,
                            price: red.price,
                            productImage: red.productImage,
                            _id: red._id,
                            request:{
                                type: 'GET',
                                url: 'http://localhost:3000/products/'+red._id
                            }
                        }
                    })
                }
                res.status(200).json(response);            
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json(error)
        })
    },
    products_create_products:(req,res)=>{
        const product=new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        })
        product.save()
        .then((result=>{
            console.log(result);
            res.status(200).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+ result._id
                    }
                }
            });
            console.log('Handling all POST requests for the products');
        }))
        .catch((error)=>{
            console.log(error)
            res.status(500).json({
                createdProduct: error
            });  
        })
    },
    products_get_by_id:(req,res)=>{
        const id= req.params.productId;
        Product.findById(id)
        .exec()
        .then((result)=>{
            console.log(result);
            if(result){
                res.status(200).json({
                    product: result,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products'
                    }
                })
            }else{
                res.status(404).json({message:'No valid entry found for provided ID'})
            }
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({error});
        })
    },
    
    products_updates_products:(req,res)=>{
        const id= req.params.productId;
        Product.update({_id:id}, {$set: req.body})
        .exec()
        .then((results)=>{
            console.log(results);
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products'+ id
                }
            })
        })
        
        .catch((err)=>{
            console.log(err);
            res.status(500).json({
                err: err
            })
        })
    },
    products_deletes_products:(req,res)=>{
        const id= req.params.productId;
        Product.remove({_id: id})
        .exec()
        .then((result)=>{
            console.log(result)
            res.status(200).json({
                mesaage: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: {name: 'String', price: 'Number'}
                }
            })
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).json({
                error: error
            });
        })
    }
}