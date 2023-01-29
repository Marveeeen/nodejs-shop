const { getCipherInfo } = require("crypto");
const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const savePath = path.join(rootDir, "data", "cart.json");

class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(savePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + Number(productPrice);
      fs.writeFile(savePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(productId, productPrice) {
    fs.readFile(savePath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };

      const product = updatedCart.products.find((product) => {
        return product.id === productId;
      });

      if (!product) {
        return;
      }

      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== productId
      );

      updatedCart.totalPrice -= productPrice * productQty;

      fs.writeFile(savePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(callBack) {
    fs.readFile(savePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        callBack(null);
      } else {
        callBack(cart);
      }
    });
  }
}

module.exports = Cart;
