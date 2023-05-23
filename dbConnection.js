const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.cxhciec.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let userCollection, petCollection;
// Connecting to the database
const connectDB = (callback) => {
  client.connect((err) => {
    if (err) {
      console.error("Failed to connect to the database", err);
    } else {
      console.log("dbConnected successfully");
      const db = client.db("GroupProject");
      userCollection = db.collection("userInfo");
      petCollection = db.collection("petInfo");
      return callback(err);
    }
  });
};
// Real-time Collection updates
const getUserCollection = () => userCollection;
const getPetCollection = () => petCollection;

module.exports = { connectDB, getUserCollection, getPetCollection };
