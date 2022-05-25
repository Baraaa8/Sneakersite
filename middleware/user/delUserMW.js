/**
 * Törli a felhasználót az adatbázisból és visszatérünk a / oldalra
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.user === 'undefined') 
            return next();

        res.locals.user.remove(err => {
            if (err) {
                return next(err);
            }

        res.locals.cipok.forEach(element => {
            if (element._elado.toString() == res.locals.user._id)
            element.remove();
        });   

            return res.redirect('/');
        });
    };
};
