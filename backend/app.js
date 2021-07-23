const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });


const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user");
const dialogRoutes = require("./routes/dialog");
const messageRoutes = require("./routes/message");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("error"));

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.io = io;
  return next();
});


app.use("/api/auth", userRoutes);
app.use("/api", dialogRoutes);
app.use("/api", messageRoutes);

module.exports = server;


