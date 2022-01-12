const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req , res){
  // console.log(req.body.crypto);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  // var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  // var finalURL = baseURL + crypto + fiat ;

  var amount = req.body.amount;

  var options = {
    url:"https://apiv2.bitcoinaverage.com/convert/global" ,
    method:"GET" ,//by default
    qs : {
      from : crypto,
      to: fiat ,
      amount : amount,
    }
  };
  // request(finalURL , function(error,response,body){
  request(options , function(error,response,body){

    // console.log(response); //to get all data
    // console.log(response.statusCode);  // to get statuscode, 200 stands for success, for info about statuses visit httpstatuses.com
    // console.log(body); //to get the useful data

    var data = JSON.parse(body); //converting from JSON format to javascript format.
    // data = JSON.stringify(body); converting from javascript format to JSON.
    // var price = data.last;
    var price = data.price;
    console.log(price);
    // var curreDate = data.display_timestamp;
    var curreDate = data.time;
    res.write("<p> The current date is " + curreDate + "</p>");
    res.write("<h1>" +amount + " " + crypto + " is currently worth " + price + " " +fiat+ "</h1>");
    // res.send("<h1>The current Price of " + crypto + " is " + price + " " +fiat+ "</h1>");
    res.send(); //this can send data only once res.write() is used to send two  data at same time
  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000. ");
});
