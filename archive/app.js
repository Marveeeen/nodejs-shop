const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const PORT = "8080";

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// setup template engine
app.set("view engine", "ejs");
app.set("views", "views");

// middleware for parsing data
app.use(bodyParser.urlencoded({ extended: false }));

// for static resources
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// for routing
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Defining relations
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
  // .sync({force: true})
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Marvin", email: "test@test.com" });
    }

    return Promise.resolve(user);
  })
  .then((user) => {
    console.log("USER FOUND");
    // SERVE SERVER 8080
    if (user.getCart()) {
      return Promise.resolve();
    }
    return user.createCart();
  })
  .then((cart) => {
    app.listen(PORT, () => console.log("Server running"));
  })
  .catch((err) => {
    console.log(err);
  });
