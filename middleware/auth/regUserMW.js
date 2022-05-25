/**
 * Elmenti a regisztrált felhasználót az adatbázisba
 */
const requireOption = require('../requireOption');


function diffYears(dt2, dt1) {
    var diff = (dt2.getTime() - dt1) / (1000 * 60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));
}


module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, "UserModel");

    return async function (req, res, next) {

        if (
            typeof req.body.vezeteknev === "undefined" ||
            typeof req.body.keresztnev === "undefined" ||
            typeof req.body.felhasznalonev === "undefined" ||
            typeof req.body.datum === "undefined" ||
            typeof req.body.jelszo === "undefined"
        ) {
            return next();
        }

        const today = new Date();
        const datum = new Date(req.body.datum);
        
        if (
            (diffYears(today, datum) < 14)
        ) {
            res.locals.error = 'Nem töltötte be a 14. életévét';
            return next();
        }

        if (await UserModel.exists({username: req.body.felhasznalonev})) {
            res.locals.error = 'A felhasználónév már foglalt!'
            return next();
        }

        const newUser = new UserModel({
            nev: req.body.vezeteknev + " " + req.body.keresztnev,
            username: req.body.felhasznalonev,
            szuletesiIdo: req.body.datum,
            egyenleg: 0,
            jelszo: req.body.jelszo
        });

        newUser.save();
        return res.redirect('/');
    };
};
