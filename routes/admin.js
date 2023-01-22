const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin')

router.get("/add-product", adminController.getAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.get("/products", adminController.getAdminProducts);


router.post("/add-product", adminController.postAddProduct);

router.post("/edit-product", adminController.postEditProduct);


module.exports = router;
