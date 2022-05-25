/**
 * Kijelentkezteti a bejelentkezett felhasználót és visszairányítja a / oldalra.
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {
     return function (req, res, next) {
        req.session.destroy(err => {
        	res.redirect('/');
    	});
     };
 };