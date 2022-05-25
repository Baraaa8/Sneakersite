/**
 * Visszaadja a paraméterként kapott :cipoid cipőt
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const ShoesModel = requireOption(objectrepository, 'ShoesModel');

    return function (req, res, next) {
        ShoesModel.findOne({
            _id: req.params.cipoid
        }, (err, cipo) => {
            if (err || !cipo) {
                return next(err);
            }

            res.locals.cipo = cipo;
            return next();
        });
    };
};
