/**
 * Meghirdeti a paraméterként kapott cipőt
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {
     return function (req, res, next) {
        if (typeof res.locals.cipo === 'undefined')
            return next();
            
        res.locals.cipo.hirdetve ="Igen";
        return next();
     };
 };