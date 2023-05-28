var express = require("express");
var app = express();
require("./dbConnection");
let router = require("./Route/route");
const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Redirect to main.html for root URL
app.get("/", function (req, res) {
  res.redirect("/login.html");
});

var port = process.env.port || 3000;
http.listen(port, () => {
  console.log("App listening to: " + port);
});

