const localCtrl = {};
const Local = require("../models/Local");

//carga el form para crear una local
localCtrl.renderLocalForm = (req, res) => {
    res.render("locals/form-local");
};

//crea un nuevo local y redirecciona a todos los locales
localCtrl.createNewLocal = async(req, res) => {
    const { nombreLocal, ciudad, direccion, descripcion } = req.body;
    const newLocal = new Local({ nombreLocal, ciudad, direccion, descripcion });
    newLocal.user = req.user.id;
    await newLocal.save();
    req.flash("scs_msg", "Local agregado correctamente.");
    res.redirect("/locals");
};

//carga la vista de todos los locale
localCtrl.renderLocal = async(req, res) => {
    const locals = await Local.find({ user: req.user.id }).lean();
    res.render("locals/all-locales", { locals });
};

//carga la vista para editar locales
localCtrl.renderEditForm = async(req, res) => {
    const locals = await Local.findById(req.params.id);
    if (locals.user != req.user.id) {
        req.flash("error_msg", "NO AUTORIZADO!!");
        return res.redirect("/locals");
    }
    res.render("locals/edit-local", { locals });
};

//actualiza local y redirecciona a vista de todos los locales
localCtrl.updateLocal = async(req, res) => {
    const { nombreLocal, ciudad, direccion, descripcion } = req.body;
    await Local.findByIdAndUpdate(req.params.id, {
        nombreLocal,
        ciudad,
        direccion,
        descripcion,
    });
    req.flash("scs_msg", "Local Actualziado correctamente.");
    res.redirect("/locals");
};

//eliminar local
localCtrl.deleteLocal = async(req, res) => {
    await Local.findByIdAndDelete(req.params.id);
    res.redirect("/locals");
};

module.exports = localCtrl;