var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { exec } = require('child_process');
var url = require('url');

mongoose.connect('localhost:27017/blogPosts');
var Schema = mongoose.Schema;

// https://github.com/mschwarzmueller/nodejs-basics-tutorial/blob/master/11-mongoose/routes/index.js

var userDataSchema = new Schema({
  post: {type: String}
}, {collection: 'posts'});

var UserData = mongoose.model('UserData', userDataSchema);

router.get('/', function(req, res, next) {
  res.render('index', {title: "CCC"});
});

router.post('/runServerprogram', function(req, res, next) {
  var theCommand = req.body.srvCommand;
  var commandOutput = "";

  exec(theCommand, (err, stdout, stderr) => {
    var theErr = "";
    if (err) {
      //some err occurred
      theErr = err;
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
     console.log(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);
     commandOutput = `${stdout}` + `${stderr}`;
    }
    commandOutput = commandOutput + theErr;
    res.render('index', {title: "Server Command Example", outputFromCommand: commandOutput});
  });
});

router.post('/getAppNames', function(req, res, next) {
  let theObj = {names: ["John Doe", "Jane Doe", "John Doe 545", "Jane Doe 1",  "John Doe 2", "Jane Doe 2"],
                flyFrom: ["Dublin", "Shannon", "Cork", "Belfast",  "Donegal", "Derry"],
                flyTo: ["London", "Tenerife", "Faro", "Madrid",  "New York", "Boston"]};
  console.log("Send data to Appppppppppppppppp");
  console.log(theObj.names.length);
  res.status(201).send(theObj);
});

router.post('/login', (request, response) =>{

    const enteredUserValues = new userValuesCopy({
        gearSalePrice:request.body.gearSalePrice,
        totalMaterialSaleCost:request.body.totalMaterialSaleCost,
        saleCommission:request.body.saleCommission,
        saleDeposit:request.body.saleDeposit,
        totalProfit:request.body.totalProfit
    })
    enteredUserValues.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(data)
    })
})

module.exports = router
