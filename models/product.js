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
  constructor(title) {
    this.title = title;
  }

  save() {
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
}

module.exports = Product;
