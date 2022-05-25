/**
 * Betölti az összes cipőt az adatbázisból
 * Ezek betöltve a res.locals.cipok-be
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    
    const ShoesModel = requireOption(objectrepository, 'ShoesModel');

    return function (req, res, next) {  
        ShoesModel.find((err, cipok) => {
            if (err) {
                return next(err)
            }
            res.locals.cipok = cipok;
            return next();
        })
    };
};
