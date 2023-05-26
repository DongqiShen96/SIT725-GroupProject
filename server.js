var express = require('express');
var app = express();
require('./dbConnection');
let router = require('./Route/route');
const { connectDB } = require("./dbConnection");

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',router);

// Route for the root URL
app.use("/uploads", express.static("uploads"));
app.get("/", function (req, res) {
     res.sendFile(__dirname + "/public/user-information.html");
});

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log('App listening to: ' + port);
});

// Start the server after the database connection is established
connectDB((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
});
