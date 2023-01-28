const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({
    title,
    price,
    imageUrl,
    description,
  })
    .then((result) => {
      console.log('Created Product');
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err);
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

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: Boolean(editMode),
      product,
    });
  });
};

const postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;

  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};

module.exports = {
  getAddProduct,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  postAddProduct,
  postDeleteProduct,
};
