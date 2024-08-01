const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const Schemaz = new mongoose.Schema({
    name: String,
    description: String
});

const Modelz = mongoose.model("Csdatabase", Schemaz);

app.post("/Csdatabase", async (req, res) => {
    try {
        let newDocument = new Modelz(req.body);
        await newDocument.save();
        let updatedDocuments = await Modelz.find();
        res.send(updatedDocuments);
        console.log(newDocument);
        console.log(updatedDocuments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/Csdatabase/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let document = await Modelz.findById(id);
        res.send(document);
        console.log(document);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/Csdatabase/:id", async (req, res) => {
    try {
        let id = req.params.id;
        await Modelz.findByIdAndDelete(id);
        let updatedDocuments = await Modelz.find();
        res.send(updatedDocuments);
        console.log(updatedDocuments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/Csdatabase", async (req, res) => {
    try {
        let documents = await Modelz.find();
        res.send(documents);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

mongoose.connect(process.env.DB_connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(err => {
        console.log(err);
    });

app.listen(5500, () => {
    console.log("Server is running on port 5500");
});
