const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const userRoutes = require("./routes/user");
const dialogRoutes = require("./routes/dialog");
const messageRoutes = require("./routes/message");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const socketConnection = require("./middleware/socketConnection");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chatApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("error:" + error));

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));
app.disable("etag");

app.use((req, res, next) => {
  req.io = io;
  return next();
});
socketConnection(io);

app.use("/api", userRoutes);
app.use("/api", dialogRoutes);
app.use("/api", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

module.exports = server;
