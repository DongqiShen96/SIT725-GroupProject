var express = require("express");
const multer = require("multer");
var app = express();
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.ctzja1c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/user-information.html");
});

client.connect((err) => {
  if (err) throw err;
  userCollection = client.db("User-information").collection("userInfo");
  petCollection = client.db("User-information").collection("petInfo");
  console.log("Connected to MongoDB!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
