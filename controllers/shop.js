const Product = require("../models/product");
const Cart = require("../models/cart");

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldsData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: "Product Detail",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldsMetData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

const getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (cartProd) => cartProd.id === product.id
        );

        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect("/");
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
