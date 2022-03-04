const express=require("express");
const faker=require("faker");
var bodyParser=require("body-parser")
const app=express();

app.use(bodyParser())
app.set("views","./views");
app.set("view engine","ejs");

var users=[];
for(let i=0;i<5;i++){
    users.push({
        name:faker.name.findName(),
        email:faker.internet.email(),
        age:i+30,
        city:faker.address.city(),
        profession:faker.name.jobTitle()
    })
}
console.log(users)
app.get("/",(req,res)=>{
    res.render("index.ejs",{users});
})
app.get("/form",(req,res)=>{
    res.render("form.ejs");
})
app.post("/user/add",(req,res)=>{
    users.push({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        city: req.body.city,
        profession:req.body.profession
      })
    res.redirect("/")
})
app.listen(3000,()=>console.log("Server is running"))