var express = require("express");
var app = express();
var router = require("./Route/route");

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/user-information.html");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
