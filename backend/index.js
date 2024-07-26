require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/db');
const vendor = require('./vendor/vendor');

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.post('/login', async (req, res) => {
    const body = req.body;

    const count = await db.find({email: body.email, pass: body.pass}).countDocuments();
    if(count == 1) { // user exist
        res.send({msg: "Login successfull"})
    } else {
        res.send({msg: "Login failed"})
    }
})

app.post('/register', async (req, res) => {
    const body = req.body;
    const data = await db.create(body);
    res.status(201).json({msg: 'user created successfully', data: data});
})


app.post('/addproduct', async (req, res) => {
    const body = req.body;
    console.log("add product working");
    console.log(body);
    const data = await db.create(body);
    // res.status(201).json({msg: 'user created successfully', data: data});
})

app.post('/addvendor', async (req, res) => {
    const body = req.body;


    const data = await vendor.find().sort({ vendor_id: -1 }).limit(1);

    const vendor_id = data[0].vendor_id + 1;
    
    const vendor_data = await vendor.create({ vendor_id: vendor_id, name: body.name, email:body.email,address: body.address, pass:body.pass });


    res.status(201).json({msg: 'Vendor created successfully', data: vendor_data});
})

app.get('/vendors', async (req, res) => {


    const data = await vendor.find().exec();

    res.status(201).json({data: data});
})

app.listen(process.env.PORT, () => console.log("app started"));