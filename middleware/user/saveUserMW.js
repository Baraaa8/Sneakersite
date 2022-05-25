/**
 * POST-tal és paraméterrel frissítem vagy mentek az adatbázisba
 * Ha res.locals.user meg van adva, az egy frissítés, különben létrehoz egy entitást
 * Visszairányít a /user oldalra
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    return async function (req, res, next) {

        if (typeof res.locals.user === 'undefined')
            return next();


        res.locals.user.save(err => {
            if (err) {
                return next(err);
            }

            if (typeof res.locals.eredetiElado !== 'undefined')
                return res.redirect('/user/' + req.session.userid + '/sajat/cipo');
            return res.redirect('/user/' + req.session.userid);
        });
    };
};
