const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.cxhciec.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err) => {
  if (!err) {
    console.log("Mongo DB connected");
  } else {
    console.log("Error: ", err);
    process.exit(1);
  }
});
// Real-time Collection updates
const getUserCollection = () => userCollection;
const getPetCollection = () => petCollection;

module.exports = client;
