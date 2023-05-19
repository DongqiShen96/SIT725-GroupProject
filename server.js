var express = require("express");
const multer = require("multer");
var app = express();
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.cxhciec.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Route for the root URL
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/user-information.html");
});

client.connect((err) => {
  if (err) throw err;
  // Get the 'userInfo' and 'petInfo' collections from the database
  userCollection = client.db("GroupProject").collection("userInfo");
  petCollection = client.db("GroupProject").collection("petInfo");
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

// User photo upload
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

// Pet photo upload
app.post("/api/pet-upload", upload.single("pet-photo-img"), (req, res) => {
  console.log(req.file); // contains information about the file.
  const petimgUrl = "/uploads/" + req.file.filename;
  res.json({ message: "Pet image uploaded successfully", imgUrl: petimgUrl });
});

// Store user info
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

// Store pet info
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

// Fetch user info
app.get("/api/userinfo", (req, res) => {
  userCollection.find().toArray((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
});

// Fetch pet info
app.get("/api/petinfo", (req, res) => {
  petCollection.find().toArray((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
});
