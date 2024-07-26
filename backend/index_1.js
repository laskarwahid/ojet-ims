require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.post('/login', (req, res) => {
    const body = req.body;
    if(body.email == "aryan@gmail.com" && body.pass == "123") {
        res.json({
            msg: "Login successfull",
        })
    } else {
        res.json({
            msg: "Login failed",
        })
    }
})


app.post('/register', (req, res) => {
    const body = req.body;
    if(body.name != "") {
        res.json({
            msg: "Name sent successfully",
        })
    } else {
        res.json({
            msg: "Went wrong",
        })
    }
})

app.listen(process.env.PORT, () => console.log("app started"));