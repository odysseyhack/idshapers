const { Entry, Chain, FactomCli } = require('factom');

const cli = new FactomCli({
    host: '35.182.31.117',
    port: 8088
});

var exports = module.exports = {}; 

exports.entryHashes = [];

exports.createChain = function() {
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

exports.addEntry = function(key, value) {
    const myEntry = Entry.builder()
        .chainId('f2ace51eaf2e7dd1c09375eb7dcbb913859b80d7c72ee462d7032518a920cdcf')
        .extId(key, 'utf8')
        .content(value, 'utf8')
        .build();
    cli.add(myEntry, 'Es3k4L7La1g7CY5zVLer21H3JFkXgCBCBx8eSM2q9hLbevbuoL6a');
    exports.entryHashes.push(myEntry.hashHex());

    return myEntry.hashHex;
}

exports.wait = function(allEntries) {
    if (allEntries.length == exports.entryHashes.length) {
        res.send(allEntries);
    } else {
        setTimeout( wait, 500 );
    }
}

