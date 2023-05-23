const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.cxhciec.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let userCollection, petCollection;

client.connect((err) => {
  if (err) throw err;
  userCollection = client.db("GroupProject").collection("userInfo");
  petCollection = client.db("GroupProject").collection("petInfo");
  console.log("Connected to MongoDB!");
});

module.exports = { userCollection, petCollection };
