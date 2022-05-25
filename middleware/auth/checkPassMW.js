/**
 * Ellenőrzi a felhasználó által megadott jelszó helyességét, ha jó, megyünk tovább
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        
        if ((typeof req.body.username === 'undefined') || (typeof req.body.jelszo === 'undefined')) {
            return next();
    	}

        UserModel.findOne({
            username: req.body.username,
            jelszo: req.body.jelszo
        }, (err, result) => {
            if (err || !result) {
                res.locals.error = 'Nem megfelelő bejelentkezés';
                return next();
            }

            req.session.userid = result._id;

            return res.redirect('/user/' + req.session.userid);
        });
    };
};
