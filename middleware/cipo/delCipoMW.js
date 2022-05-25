/**
 * Törli a cipőt az adatbázisból, paraméter a :cipoid, majd visszaírányít a /cipo oldalra 
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.cipo === 'undefined') 
            return next();

        res.locals.cipo.delete(err => {
            if (err) {
                return next(err);
            }

        const fs = require("fs");
        const cipoNev = res.locals.cipo.kep.replace('/shoespic/','');
        const path = "./uploads/"+ cipoNev;

        fs.unlink(path, function (err) {
            if (err) {
              console.error(err);
            }
          });

            return res.redirect('/user/' + req.session.userid + '/sajat/cipo'); 
        });
    };
};
