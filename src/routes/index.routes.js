const { Router } = require("express");
const router = Router();

const {
    renderIndex,
    renderPerfil,
    renderRegistrarse,
} = require("../controllers/index.controller");
const { isAuthenticated } = require("../helpers/auth");

router.get("/", renderIndex);
router.get("/users/profile", isAuthenticated, renderPerfil);
router.get("/users/signup", renderRegistrarse);

module.exports = router;