/**
 * Megváltoztatja a felhasználó jelszavát
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
     
     const UserModel = requireOption(objectrepository, 'UserModel');
 
     return function (req, res, next) {

        if (req.body.toltesOsszege !== '') 
            return next();
        
        if (typeof req.body.regiJelszo === 'undefined' ||
            typeof req.body.ujJelszo === 'undefined' ||
            typeof req.body.ujJelszoUjra === 'undefined' ||
            typeof res.locals.user === 'undefined' ) 
                return next();
                
        if (req.body.regiJelszo !== res.locals.user.jelszo) {
            res.locals.error = 'Rossz a régi jelszava'
            console.log(res.locals.error)
            return next()
        }


        if (req.body.ujJelszo !== req.body.ujJelszoUjra) {
            res.locals.error = 'Nem egyezik az új és a megerősítő jelszó'
            console.log(res.locals.error)
            return next()
        }

        if (req.body.ujJelszo === "") {
            res.locals.error = 'Adjon meg valamit jelszónak'
            console.log(res.locals.error)
            return next();
        }
 
        res.locals.user.jelszo = req.body.ujJelszo;
        
        return next();
    };
};