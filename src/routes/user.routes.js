const { Router } = require("express");
const router = Router();

const {
    renderSignUpForm,
    signUp,
    renderSignInForm,
    signIn,
    logout,
    editUser,
    editProfileForm,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../helpers/auth");

router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", signUp);

router.get("/users/signin", renderSignInForm);

router.post("/users/profile", signIn);

router.get("/users/logout", isAuthenticated, logout);

router.get("/users/editProfile/:id", isAuthenticated, editProfileForm);

router.put("/users/editProfile/:id", isAuthenticated, editUser);

module.exports = router;