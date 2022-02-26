const express = require("express");
const body_parser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
const path = require("path");

app.use("/images",express.static("images"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(fileUpload());
app.listen(5000);
app.use("/",(req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });




app.get("/getImage/:name",(req,res)=>{
    res.sendFile(__dirname+"/images/"+req.params.name)

})


app.post("/add", (req, res) => {
  req.files.image.mv(
    path.resolve(__dirname, "images", req.files.image.name)
  );
    res.json(req.files.image.name)

});

// app.get("/",(req,res)=>{

//     res.json({"name":"Daniyal"})

// })


