var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://18.224.157.155:27017';

MongoClient.connect(url, function(error, db){
    //check for connection error
    if(error){
        console.(error);
        process.exierrort(1);
    }
    //prints upon successful connectino
    console.log('Opened Connection!!')
    //put methods to modify database here

    //close database
    db.close();

    process.exit(0);
})