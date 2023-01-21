const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    this.id = Math.random().toString();
    checkDataFolder();
    geProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(savePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callBack) {
    geProductsFromFile(callBack);
  }

  static findById(id, cb) {
    geProductsFromFile(products => {
      const product = products.find(product => product.id === id)
      cb(product)
    })
  }
}

module.exports = Product;
