const requireOption = require('../requireOption');
module.exports = function (objectrepository) {
    const ShoesModel = requireOption(objectrepository, 'ShoesModel');
    return async function (req, res, next) {

        if (typeof req.body.nev === 'undefined' || req.body.nev == '' ||
            typeof req.body.ar ==='undefined' || req.body.ar == '')
            return next()

        res.locals.cipo.nev = req.body.nev;
        res.locals.cipo.ar = req.body.ar; 

        res.locals.cipo.save(err => {
            if (err) {
                return next(err);
            }
        
            return res.redirect('/user/' + req.session.userid + '/sajat/cipo');
        });
    };
};
