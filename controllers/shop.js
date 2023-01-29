const Product = require("../models/product");
const Cart = require("../models/cart");

const getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product,
        pageTitle: "Product Detail",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });

      console.log(products);
    })
    .catch((err) => console.log(err));
};

const getCart = (req, res, next) => {
  const { user } = req;

  user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products,
      });
    })
    .catch((err) => console.log(err));
};

const postCart = (req, res, next) => {
  const {
    user,
    body: { productId },
  } = req;

  let fetchedCart;
  let newQuantity = 1;

  user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return Promise.resolve(product);
      }

      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

postCartDelete = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
module.exports = {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  postCart,
  postCartDelete,
  getOrders,
  getCheckout,
};
