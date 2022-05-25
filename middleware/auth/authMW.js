/**
 * Ha a felhasználó be van jelentkezve, meghívja a next-et, különben visszatér a /-hez
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        }

		if (req.session.userid !== req.params.userid) {
			return res.redirect('/user/' + req.session.userid);
		}

        return next();
    }
};
