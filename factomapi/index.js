const { Entry, Chain, FactomCli } = require('factom');

var express = require('express');
var app = express();

const cli = new FactomCli({
    host: '35.182.31.117',
    port: 8088
});

var entryHashes = [];

function createChain() {
    const firstEntry = Entry.builder()
        .extId('6d79206578742069234f3242') // If no encoding parameter is passed as 2nd argument, 'hex' is used
        .extId('did', 'utf8') // Explicit the encoding. Or you can pass directly a Buffer
        .content('Initial content', 'utf8')
    .build();

    const chain = new Chain(firstEntry);
    cli.add(chain, 'Es3k4L7La1g7CY5zVLer21H3JFkXgCBCBx8eSM2q9hLbevbuoL6a');

    console.log(chain.id.toString('hex'));

    return true;
}

function addEntry(key, value) {
    const myEntry = Entry.builder()
        .chainId('f2ace51eaf2e7dd1c09375eb7dcbb913859b80d7c72ee462d7032518a920cdcf')
        .extId(key, 'utf8')
        .content(value, 'utf8')
        .build();
    cli.add(myEntry, 'Es3k4L7La1g7CY5zVLer21H3JFkXgCBCBx8eSM2q9hLbevbuoL6a');
    entryHashes.push(myEntry.hashHex());

    return myEntry.hashHex;
}


app.get('/createChain', function (req, res) {
   createChain();
   res.sendStatus(200);
});

app.get('/addEntry/:key/:did', function (req, res) {
   addEntry(req.params.key, req.params.did);
   res.send(entryHashes[entryHashes.length-1]);
});

app.get('/listAllEntries', function (req, res) {
    var allEntries = [];
    if(entryHashes.length == 0) {
        res.send([]);
        return;
    }
    for(var i = 0; i < entryHashes.length; i++) {
     cli.getEntry(entryHashes[i]).then((result) => {
        console.log(result.extIds.toString('utf8'));
        console.log(result.content.toString('utf8'));
        console.log(result.hashHex());
        allEntries.push({key: result.extIds.toString('utf8'), value: result.content.toString('utf8'), hash: result.hashHex()});
       });
    } 

    (function wait() {
        if (allEntries.length == entryHashes.length) {
            res.send(allEntries);
        } else {
            setTimeout( wait, 500 );
        }
    })();
    
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening");
})