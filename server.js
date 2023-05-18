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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let userCollection, petCollection;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/userinfo", (req, res) => {
  const userInfo = req.body;
  userCollection.insertOne(userInfo, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        data: result,
        message: "Successfully added",
      });
    }
  });
});

app.post("/api/petinfo", (req, res) => {
  const petInfo = req.body;
  petCollection.insertOne(petInfo, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        data: result,
        message: "Successfully added",
      });
    }
  });
});

app.get("/api/userinfo", (req, res) => {
  userCollection.find().toArray((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
});

app.get("/api/petinfo", (req, res) => {
  petCollection.find().toArray((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("user-info-img"), (req, res) => {
  console.log(req.file); // contains information about the file.
  const imgUrl = "/uploads/" + req.file.filename;
  res.json({ message: "File uploaded successfully", imgUrl: imgUrl });
});

app.post("/api/userinfo", (req, res) => {
  const userInfo = req.body;
  userCollection.insertOne(userInfo, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        data: result,
        message: "Successfully added",
      });
    }
  });
});
