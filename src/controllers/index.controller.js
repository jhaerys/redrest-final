const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render("users/signin");
};

indexCtrl.renderPerfil = (req, res) => {
    res.render("users/profile");
};

indexCtrl.renderRegistrarse = (req, res) => {
    res.render("users/signup");
};

module.exports = indexCtrl;