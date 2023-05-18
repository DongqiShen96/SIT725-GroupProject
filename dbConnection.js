const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.cxhciec.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
let projectCollection;

client.connect(err => {
    
    if (!err) {
        console.log('Mongo DB connected');
    } else {
        console.log('Error: ', err);
        process.exit(1);
    }
});

module.exports = client;