/**
 * A felhasználónak az egyenlege feltöltődik egy adott összeggel, paraméter a :userid, majd visszatérünk a /user/:userid oldalra
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.body.toltesOsszege === 'undefined' || req.body.toltesOsszege === '') 
                return next();
        res.locals.user.egyenleg += parseInt(req.body.toltesOsszege);
        return next();
    };
};
