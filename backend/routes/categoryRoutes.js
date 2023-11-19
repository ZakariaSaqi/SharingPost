const router = require("express").Router(); 
const { verifyTokenAndAdmin } = require("../middlewares/verfiyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const { createCategory, getAllCategories, deleteCategory } = require("../controllers/categoryController");

router.route("/")
.post(verifyTokenAndAdmin, createCategory)
.get(getAllCategories )

router.route("/:id")
.delete(validateObjectId, verifyTokenAndAdmin, deleteCategory )

module.exports = router;