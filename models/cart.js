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
        cart.products[existingProductIndex] = [updatedProduct];
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
}

module.exports = Cart;
