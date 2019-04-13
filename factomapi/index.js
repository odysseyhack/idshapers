const { Entry, Chain, FactomCli } = require('factom');

var express = require('express');
var app = express();

const cli = new FactomCli({
    host: '35.182.31.117',
    port: 8088
});

function createChain() {
    const firstEntry = Entry.builder()
    .extId('6d79206578742069642031') // If no encoding parameter is passed as 2nd argument, 'hex' is used
    .extId('did', 'utf8') // Explicit the encoding. Or you can pass directly a Buffer
    .content('Initial content', 'utf8')
    .build();

    const chain = new Chain(firstEntry);
    cli.add(chain, 'Es3k4L7La1g7CY5zVLer21H3JFkXgCBCBx8eSM2q9hLbevbuoL6a');

    return true;
}

function addFirstEntry(key, value) {
    const myEntry = Entry.builder()
        .chainId('9107a308f91fd7962fecb321fdadeb37e2ca7d456f1d99d24280136c0afd55f2')
        .extId('6d79206578742069642031') // If no encoding parameter is passed as 2nd argument, 'hex' is used
        .extId(key, 'utf8')
        .content(value, 'utf8')
        .build();
    cli.add(myEntry, 'Es3k4L7La1g7CY5zVLer21H3JFkXgCBCBx8eSM2q9hLbevbuoL6a');

    return true;
}


app.get('/createChain', function (req, res) {
   createChain();
   res.sendStatus(200);
});

app.get('/addEntry', function (req, res) {
   addFirstEntry('klm', 'did:passenger:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX');
   res.sendStatus(200);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening");
})