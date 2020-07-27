const productoCtrl = {};
const Producto = require("../models/Producto");

productoCtrl.renderProductoForm = (req, res) => {
    res.render("products/form-producto");
}
productoCtrl.createNewProducto = async(req, res) => {
    const { nombre, valor, descripcion } = req.body;
    const newProducto = new Producto({ nombre, valor, descripcion });
    newProducto.user = req.user.id;
    await newProducto.save();
    req.flash("scs_msg", "Producto agregado correctamente.");
    res.redirect("/products");
}

productoCtrl.renderProducto = async(req, res) => {
    const products = await Producto.find({ user: req.user.id });
    res.render("products/all-productos", { products });
}

productoCtrl.renderEditForm = async(req, res) => {
    const products = await Producto.findById(req.params.id);
    if (products.user != req.user.id) {
        req.flash("error_msg", "NO AUTORIZADO!!");
        return res.redirect("/products");
    }
    res.render("products/edit-producto", { products });
}

productoCtrl.updateProducto = async(req, res) => {
    const { nombre, valor, descripcion } = req.body;
    await Producto.findByIdAndUpdate(req.params.id, {
        nombre,
        valor,
        descripcion,
    });
    req.flash("scs_msg", "Producto Actualziado correctamente.");
    res.redirect("/products");
}

productoCtrl.deleteProducto = async(req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect("/products");
}

module.exports = productoCtrl;