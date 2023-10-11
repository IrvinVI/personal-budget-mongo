//Budget API
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const budgetData = require("./budget-data.json");

app.use(cors());
app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
const budgetModel = require("./budgets_schema");
let url = "mongodb://localhost:27017/pbdata";

const budget = {
  myBudget: [
    {
      title: "Eat out",
      budget: 25,
    },
    {
      title: "Rent",
      budget: 375,
    },
    {
      title: "Groceries",
      budget: 110,
    },
  ],
};

app.get("/budget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>{
            budgetModel
            .find({})
            .then((data) => {
            res.status(200).send(data);
            mongoose.connection.close();
            })
            .catch((connectionError) => {
            console.log(connectionError);
            res.status(500).send();
            mongoose.connection.close();
            });
        })
        .catch((connectionError)=>{
            console.log(connectionError);
            mongoose.connection.close();
        });
});

app.post("/newBudget", (req, res) => {
    console.log(req.body);
    let budgetToAdd = new budgetModel({title: req.body.title, budget: req.body.budget, color: req.body.color});
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>{
            budgetModel
            .insertMany(budgetToAdd)
            .then((data) => {
            console.log(data);
            res.send("budget has been added to the database");
            mongoose.connection.close();
            })
            .catch((connectionError) => {
            res.status(500).send(connectionError);
            mongoose.connection.close();
            });
        })
        .catch((connectionError)=>{
            console.log(connectionError);
            mongoose.connection.close();
        });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
