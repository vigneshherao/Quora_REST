const express = require("express");
const app = express();
const port = 4000;
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`port is started on localhost ${port}`);
})

let data = [
    {
        username:"vignesh",
        content:"vignesh earns 7lakh in next few monts"
    },
    {
        username:"sushant",
        content:"sushant earns 3lakh in next few monts"
    },
    {
        username:"shashank",
        content:"sushant earns 4lakh in next few monts"
    }
]
app.get("/",(req,res)=>{
    res.render("index.ejs",{data});
})
app.get("/posts",(req,res)=>{
    res.render("form.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}= req.body;
    data.push({username,content});
    res.redirect("/");
})