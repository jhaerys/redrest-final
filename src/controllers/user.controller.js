const User = require("../models/User");
const Local = require("../models/Local");
const Producto = require("../models/Producto");
const passport = require("passport");

const userCtrl = {};

//renderiza el formulario de registro de usuarios
userCtrl.renderSignUpForm = (req, res) => {
    res.render("users/signup");
};

//registrar usuario
userCtrl.signUp = async(req, res) => {
    const errors = [];
    const { nombre, apellido, correo, telefono, pass, repass } = req.body;
    if (pass != repass) {
        errors.push({ text: "contraseña no coincide" });
    }
    if (pass.length < 4) {
        errors.push({ text: "contraseña debe tener mas de 4 caracteres" });
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            nombre,
            apellido,
            correo,
            telefono,
        });
    } else {
        const correoUser = await User.findOne({ correo: correo });
        if (correoUser) {
            req.flash("error_msg", "El correo ingresado ya esta en uso");
            res.redirect("/users/signup");
        } else {
            const newUser = new User({ nombre, apellido, correo, telefono, pass });
            newUser.pass = await newUser.encrypContrasena(pass);
            await newUser.save();
            req.flash("scs_msg", "Usuario registrado con exito");
            res.redirect("/users/signin");
        }
    }
};

//renderiza el formulario de inicio de sesion
userCtrl.renderSignInForm = (req, res) => {
    res.render("users/signin");
};

//autenticacion de usuario
userCtrl.signIn = passport.authenticate("local", {
    failureRedirect: "/users/signin",
    successRedirect: "/users/profile",
    failureFlash: true,
});

//cierra sesion
userCtrl.logout = (req, res) => {
    req.logout();
    req.flash("scs_msg", "Sesion cerrada");
    res.redirect("/users/signin");
};

//renderiza el formulario de edicion
userCtrl.editProfileForm = async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user.id != req.user.id) {
        return res.redirect("/users/profile");
    }
    res.render("users/edit-profile", { user });
};

//editar usuario
userCtrl.editUser = async(req, res) => {
    const { nombre, apellido, correo, telefono, pass, repass } = req.body;
    if (pass != repass || pass === "") {
        req.flash("error_msg", "Las contraseñas no coinciden o esta vacia.");
        res.redirect(`/users/profile`);
    } else {
        const user = new User({ nombre, apellido, correo, telefono, pass });
        user.pass = await user.encrypContrasena(pass);
        await User.findByIdAndUpdate(req.params.id, {
            nombre,
            apellido,
            correo,
            telefono,
            pass: user.pass,
        });
        req.flash("scs_msg", "Usuario actualizado correctamente.");
        res.redirect("/users/profile");
    }
};

module.exports = userCtrl;