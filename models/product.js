const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const Cart = require("./cart");

const savePath = path.join(rootDir, "data", "products.json");

const geProductsFromFile = (callBack) => {
  fs.readFile(savePath, (err, fileContent) => {
    if (err) {
      return callBack([]);
    }

    callBack(JSON.parse(fileContent));
  });
};

const checkDataFolder = () => {
  const dataPath = path.join(rootDir, "data");
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
  }
};

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    checkDataFolder();
    geProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(savePath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(savePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callBack) {
    geProductsFromFile(callBack);
  }

  static findById(id, cb) {
    geProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }

  static deleteProduct(id) {
    geProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);

      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(savePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
}

module.exports = Product;
