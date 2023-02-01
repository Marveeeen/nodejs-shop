const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const PORT = "8080";

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

// setup template engine
app.set("view engine", "ejs");
app.set("views", "views");

// middleware for parsing data
app.use(bodyParser.urlencoded({ extended: false }));

// for static resources
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {});

// for routing
app.use("/admin", adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect(() => {
  app.listen(PORT);
});
