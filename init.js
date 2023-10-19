const mongoose = require("mongoose");
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
}
main()
.then(()=>{
    console.log("connection secure")
}) .catch((err)=>{
    console.log(err)
});
const Chat = require("./models/chat.js");

let allChats = ([
    {
        from:"shubham",
        to:"devansh",
        msg:"call me",
        Created_at: new Date()
    } ,
    {
        from:"Bhavesh",
        to:"anushell",
        msg:"meet me in lunch",
        Created_at: new Date()
    } ,
    {
        from:"pragati",
        to:"chelsi",
        msg:"where are you",
        Created_at: new Date()
    } ,
    {
        from:"shubham",
        to:"Tanish",
        msg:"Hi ! how are you ",
        Created_at: new Date()
    } ,
    {
        from:"pragati",
        to:"devansh",
        msg:"call me later",
        Created_at: new Date()
    } ,
]);
Chat.insertMany(allChats);













