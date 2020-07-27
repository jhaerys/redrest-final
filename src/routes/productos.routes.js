const { Router } = require("express");
const router = Router();
const {
    renderProductoForm,
    createNewProducto,
    renderProducto,
    renderEditForm,
    updateProducto,
    deleteProducto,
} = require("../controllers/producto.controller");
const { isAuthenticated } = require("../helpers/auth");

//nueva producto
router.get("/products/add", isAuthenticated, renderProductoForm);

router.post("/products/form-producto", isAuthenticated, createNewProducto);

//obtener todos los productos
router.get("/products", renderProducto);

//editar productos
router.get("/products/edit/:id", isAuthenticated, renderEditForm);

router.put("/products/edit/:id", isAuthenticated, updateProducto);

//eliminar producto
router.delete("/products/delete/:id", isAuthenticated, deleteProducto);

module.exports = router;