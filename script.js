const express = require("express")
const mongoose = require("mongoose")
const bodyParse = require("body-parser")
const cors = require("cors")
const app = express()



app.use(express.static('public'));
app.use(bodyParse.json())
app.use(cors())

const Schemaz = new mongoose.Schema({
    name: String,
    description: String
})

const Modelz = mongoose.model("csdatabase", Schemaz)

app.get("/csdatabase", async (req,res)=>{
    try {
         req = await Modelz.find()
         res.send(req)
    } catch (error) {
        res.status(500).send(error.message);
    } 
})

app.post("/csdatabase", async (req,res)=>{
    try {
        let newRoom = new Modelz(req.body)
        newRoom.save()
        let updatedRoomz = await Modelz.find()
        res.send(updatedRoomz)
        console.log(newRoom);
        console.log(updatedRoomz);
    } catch (error) {
        res.status(500).send(error.message);
    }
   
})

app.get("/csdatabase/:id", async (req,res)=>{
    try {
        let id = req.params.id
        let room = await Modelz.findById(id)
        res.send(room)
        console.log(room);
    } catch (error) {
        res.status(500).send(error.message);
    }
    
})

app.delete("/csdatabase/:id", async (req,res)=>{
    try{
    let id = req.params.id
    let room = await Modelz.findByIdAndDelete(id)
    let updatedRooms = await Modelz.find();
    res.send(updatedRooms)
    console.log(updatedRooms);
    }catch (error){
        res.status(500).send(error.message);
    }
})

mongoose.connect("mongodb+srv://jalilvrauf:OQV6jqvM20c1onpE@cluster0.ouwwhky.mongodb.net/")
.then(res=>{
    console.log("Connected to DB");
})
.catch(err =>{
    console.log(err);
})


app.listen(7070, ()=>{
    console.log("Port 7070 is listened");
})