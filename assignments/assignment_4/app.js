const express= require("express");
const mongoose = require('mongoose');
const User = require("./model/user");
const bodyparser = require("body-parser");
const app=express();
mongoose.connect('mongodb://localhost:27017/assignment_4');
var methodOverride = require('method-override');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(express.static("public"));
app.use(bodyparser());
app.set("views","./views");
app.set("view engine", "ejs");

app.get("/",async (req,res) => {
    //add the code to read the data from the database
    const users=await User.find();
    res.render("home.ejs",{users});
})

app.get("/form",(req,res)=>{
    res.render("form.ejs");
})

//update
app.put("/users/:id",async(req,res)=>{
    await User.updateOne({_id:req.params.id},[
        { $set: { isPromoted: { $not: "$isPromoted" } } }
    ])
    res.redirect("/")
})

//delete
app.delete("/users/:id", async(req,res) =>{
    await User.deleteOne({_id: req.params.id});
    res.redirect("/")
})

app.post("/users/add", async(req,res)=>{
    await User.create({
        name:req.body.name,
        email:req.body.email,
    })
    res.redirect("/");
})

app.listen(3000,()=>console.log("server is listening at port 3000"));