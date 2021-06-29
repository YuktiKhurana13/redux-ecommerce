const express =require('express');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');
const shortid =require('shortid');

const app=express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/redux-ecommerce-db",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const product=mongoose.model('products',new mongoose.Schema({
    _id:{type: String, default: shortid.generate},
    image:String,
    title:String,
    description:String,
    price:Number,
    availableSizes:[String]

}))

app.get('/api/products',async (req,res)=>{
    const products= await product.find({});
    res.send(products);
});

app.post('/api/products',async (req,res)=>{
    const newProduct=new product(req.body);
    const savedProduct=await newProduct.save();
    res.send(savedProduct);
});

app.delete('/api/products/:id',async (req,res)=>{
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);

})

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log('server listening at port 5000'))