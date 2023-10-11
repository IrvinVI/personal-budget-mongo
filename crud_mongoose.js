const mongoose = require("mongoose");
const budgetModel = require("./budgets_schema");

let url = 'mongodb://localhost:27017/pbdata';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            let budget1 = new budgetModel({title: "Eat out", budget: 50, color: "#ffcd56"});
            let budget2 = new budgetModel({title: "Rent", budget: 375, color: "#ff6384"});
            let budget3 = new budgetModel({title: "Groceries", budget: 100, color: "#36a2eb"});
            let budget4 = new budgetModel({title: "Car payment", budget: 150, color: "#fd6b19"});
            let budget5 = new budgetModel({title: "Insurance", budget: 60, color: "#1D8348"});
            let budget6 = new budgetModel({title: "Medical bill", budget: 115, color: "#7D3C98"});
            let budget7 = new budgetModel({title: "Phone bill", budget: 40, color: "#E74C3C"});

            budgetModel.insertMany([budget1, budget2, budget3, budget4, budget5, budget6, budget7])
            .then((data) => {
               console.log(data);
               mongoose.connection.close();
            })
            .catch((connectionError) => {
               console.log(connectionError);
            });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })