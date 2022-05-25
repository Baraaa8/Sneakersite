/**
 * Kiküldi a felhasználónak az elfelejtett jelszavát
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        if ((typeof req.body.username === 'undefined')) {
            return next();
    	}

        UserModel.findOne({
            username: req.body.username
        }, (err, result) => {
            if (err || !result) {
                res.locals.error = 'Hiba tortent';
                return next();
            }

            console.log(result.jelszo);

            return res.redirect('/');
        });
    };
};
