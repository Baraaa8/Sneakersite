/**
 * A vásárolt cipő birtokosa innentől azé, aki sikeresen megvásárolta
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return async function (req, res, next) {
        if (res.locals.cipo.hirdetve === 'Nem')
            return res.redirect('/');

        if (res.locals.cipo.ar > res.locals.user.egyenleg)
            return res.redirect('/user/' + req.session.userid + '/elado/cipo');
            
        res.locals.eredetiElado = res.locals.cipo._elado;
        res.locals.cipo._elado = req.session.userid;
        res.locals.cipo.hirdetve = 'Nem'
        res.locals.user.egyenleg -= res.locals.cipo.ar;

        if (typeof res.locals.eredetiElado !== 'undefined') {
                UserModel.findOne({
            _id: res.locals.eredetiElado
        }, (err, elado) => {
            if (err || !elado) {
                return next(err);
            }

            elado.egyenleg += res.locals.cipo.ar;

            res.locals.cipo.save(err => {
                if (err)
                    return next(err);
            })

            elado.save(err => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        });
        }
     };
 };