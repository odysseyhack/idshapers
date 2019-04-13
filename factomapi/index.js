var express = require('express');
var chainIntegrator = require('./chainIntegrator.js');
var app = express();


app.get('/createChain', function (req, res) {
   createChain();
   res.sendStatus(200);
});

app.get('/addEntry/:key/:did', function (req, res) {
   chainIntegrator.addEntry(req.params.key, req.params.did);
   res.send(chainIntegrator.entryHashes[chainIntegrator.entryHashes.length-1]);
});

app.get('/listAllEntries', function (req, res) {
    var allEntries = [];
    if(chainIntegrator.entryHashes.length == 0) {
        res.send([]);
        return;
    }

    for(var i = 0; i < chainIntegrator.entryHashes.length; i++) {
     cli.getEntry(chainIntegrator.entryHashes[i]).then((result) => {
        console.log(result.extIds.toString('utf8'));
        console.log(result.content.toString('utf8'));
        console.log(result.hashHex());
        allEntries.push({key: result.extIds.toString('utf8'), value: result.content.toString('utf8'), hash: result.hashHex()});
       });
    } 

    function wait() {
        if (allEntries.length == chainIntegrator.entryHashes.length) {
            res.send(allEntries);
        } else {
            setTimeout( wait, 500 );
        }
    }
    wait();
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening");
})