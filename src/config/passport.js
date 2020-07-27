const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

passport.use(
    new LocalStrategy({
            usernameField: "correo",
            passwordField: "pass",
        },
        async(correo, pass, done) => {
            const user = await User.findOne({ correo: correo });
            if (!user) {
                return done(null, false, { message: "Usuario no encontrado." });
            } else {
                const encontrar = await user.compararContrasena(pass);
                if (encontrar) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Contraseña incorrecta." });
                }
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});