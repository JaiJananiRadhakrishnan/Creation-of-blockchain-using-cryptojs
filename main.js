const { BlockChain } = require("./blockchain");

var express = require("express");
var app = express();
let blockchain = new BlockChain();
//aggiungo due dati per esempio
blockchain.newblock(new Date().getTime(), 392);
blockchain.newblock(new Date().getTime(), 678);
app.get("/", function(req, res) {
  res.json({
    endpoints: [
      {
        action: "chain",
        url: "http://localhost:3000/chain",
        note: "visualize the blockchain"
      },
      {
        action: "add",
        url: "http://localhost:3000/add?amount=35",
        note: "add a newblock with 35 as amount"
      },
      {
        action: "validate",
        url: "http://localhost:3000/validate",
        note: "check if blockchain is corrupted or not"
      },
      {
        action: "corrupt",
        url: "http://localhost:3000/corrupt",
        note: "corrupt the blockchain changing amount value of second block"
      }
    ]
  });
});

app.get("/add", function(req, res) {
  blockchain.newblock(new Date().getTime(), req.query.amount);
  
  res.json("new block created with amount: " + req.query.amount);
});

app.get("/chain", function(req, res) {
	// Require the package
const QRCode = require('qrcode')
 
// Creating the data
let data = {
    name:"Employee Name",
    age:27,
    department:"Police",
    id:"aisuoiqu3234738jdhf100223"
}
 
// Converting the data into String format
let stringdata = JSON.stringify(data)
 
// Print the QR code to terminal
QRCode.toString(stringdata,{type:'terminal'},
                    function (err, QRcode) {
 
    if(err) return console.log("error occurred")
 
    // Printing the generated code
    console.log(QRcode)
})
   
// Converting the data into base64
QRCode.toDataURL(stringdata, function (err, code) {
    if(err) return console.log("error occurred")
 
    // Printing the code
    console.log(code)
})
  //res.json(QRCode);
  res.json(blockchain.chain());
});
app.get('/chain/:id', async function(req, res) {
    
    // Retrieve the tag from our URL path
    var id = req.params.id;

    let articles = await Article.findAll({chain: id}).exec();

    res.render('chain', {
        articles: articles
    });
});

app.get("/validate", function(req, res) {
  res.json(blockchain.validate());
});

app.get("/corrupt", function(req, res) {
  blockchain.blockchain[2].data.amount = "1644.33";
  res.json("second block amount changed");
});

app.listen(3000, function() {
  console.log("Blockchain listen on port 3000!");
});
