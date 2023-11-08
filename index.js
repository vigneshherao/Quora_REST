const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`port is started on localhost ${port}`);
})

let posts = [
    {
        id:uuidv4(),
        username:"vignesh",
        content:"vignesh earns 7lakh in next few monts"
    },
    {
        id:uuidv4(),
        username:"sushant",
        content:"sushant earns 3lakh in next few monts"
    },
    {
        id:uuidv4(),
        username:"shashank",
        content:"sushant earns 4lakh in next few monts"
    }
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/newposts",(req,res)=>{
    res.render("form.ejs");
})

app.post("/posts",(req,res)=>{
    let id = uuidv4(); 
    let {username,content}= req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
})


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let idData = posts.find((p) => {
        return id === p.id;
    });
    res.render("id.ejs",{idData});
})




app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let idData = posts.find((p) => {
        return id === p.id;
    });
    idData.content = newContent;
    res.send("working");
})


app.get("/posts/edit/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => {
        return id === p.id;
    });
    res.render("edit.ejs",{post});
})


app.post("/posts",(req,res)=>{
    let newContents = req.body.newContent;
    let post = posts.find((p) => {
        return id === p.id;
    });
    post.content= newContents;

})