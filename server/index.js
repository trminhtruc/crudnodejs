const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '112233',
    database: 'mydb',
});

db.connect((err)=>{
    if(err){
        throw(err);
    }
    console.log("Connected");
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res)=>{
    const sqlSelect = "SELECT * FROM customers";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const cusName = req.body.cusName;
    const cusAddress = req.body.cusAddress;
    const sqlInser = "INSERT INTO customers (ten, address) VALUES (?,?)";
    db.query(sqlInser, [cusName, cusAddress], (err,result) => {
        if(err){
            console.log(err);
        }
    });
});

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM customers WHERE id = ?";
    db.query(sqlDelete, id, (err, result) =>{
       if(err) {
        console.log(err);
       }
    });
});


app.put('/api/update', (req, res) => {
    const name = req.body.cusName;
    const address = req.body.cusAddress;
    const sqlUpdate = 'UPDATE customers SET address = ? where ten = ?';
    db.query(sqlUpdate, [address,name], (err, result) => {
        if(err) 
            console.log(err);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});