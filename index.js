const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
const Chat = require("./models/chat.js");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
}
main()
.then(()=>{
    console.log("connection secure")
}) .catch((err)=>{
    console.log(err)
});

app.listen(port,()=>{
    console.log("app is listening");
});
app.get("/",(req,res)=>{
    res.send("working");
});
// let chat1 = new Chat({
//     from:"shubham",
//     to:"devansh",
//     msg:"call me",
//     Created_at: new Date()
// })
// chat1.save().then((res)=>{console.log(res);});
app.get("/chats", async (req,res)=>{
 let chats = await Chat.find()
//  res.render("index.js",{chats});
res.render("index.ejs",{chats});
 });
 app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
 });
 app.post("/chats",async (req,res)=>{
    let {from ,msg,to}=req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        Created_at: new Date()
    });
  newChat.save()
  .then(()=>{console.log("saved");})
  .catch((err)=>{console.log(err);});
  res.redirect("/chats")
 })
app.get("/chat/:id/edit",async (req,res)=>{
    let {id}= req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
app.patch("/chat/:id", async (req,res)=>{
    let{id}= req.params;
    let {msg}=req.body;
    let updatedChat =await Chat.findByIdAndUpdate(id,{msg},{runValidators:true},{new:true}
);

res.redirect("/chats");

});
app.delete("/chat/:id",async (req,res)=>{
    let {id} = req.params;
    let deletechat = await Chat.findByIdAndDelete(id,);
    console.log(deletechat);
    res.redirect("/chats")
})