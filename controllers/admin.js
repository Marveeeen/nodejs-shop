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
      console.log("Created Product");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products-list", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  const { productId } = req.params;
  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: Boolean(editMode),
        product,
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;

  Product.update(
    { title, imageUrl, description, price },
    {
      where: {
        id: productId,
      },
    }
  )
    .then((result) => {
      console.log("Product Updated");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.destroy({ where: { id: productId } });
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
