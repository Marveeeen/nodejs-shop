const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products-list", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

module.exports = {
  getAddProduct,
  getAdminProducts,
  postAddProduct,
};
