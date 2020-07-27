const { Router } = require("express");
const router = Router();
const {
    renderLocalForm,
    createNewLocal,
    renderLocal,
    renderEditForm,
    updateLocal,
    deleteLocal,
} = require("../controllers/local.controller");
const { isAuthenticated } = require("../helpers/auth");
//nueva Local
router.get("/locals/add", isAuthenticated, renderLocalForm);

router.post("/locals/form-local", isAuthenticated, createNewLocal);

//obtener todos los Local
router.get("/locals", renderLocal);

//editar Local
router.get("/locals/edit/:id", isAuthenticated, renderEditForm);

router.put("/locals/edit/:id", isAuthenticated, updateLocal);

//eliminar Local
router.delete("/locals/delete/:id", isAuthenticated, deleteLocal);

module.exports = router;