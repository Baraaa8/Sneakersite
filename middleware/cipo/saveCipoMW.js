const requireOption = require('../requireOption');
module.exports = function (objectrepository) {
   const ShoesModel = requireOption(objectrepository, 'ShoesModel');
   return async function (req, res, next) {
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.file === 'undefined' ||
            typeof req.body.ar === 'undefined'
        )  {
            if (typeof res.locals.cipo !== 'undefined') { 
                res.locals.cipo.save(err => {
                    if (err) {   
                        return next(err);
                    }

                    return res.redirect('/user/' + req.session.userid + '/sajat/cipo');
                });
        }
        else 
                return next();
        } else {
            if (typeof res.locals.cipo === 'undefined')
                res.locals.cipo = new ShoesModel();
            
            res.locals.cipo.nev = req.body.nev;
            if (typeof req.file !== 'undefined')
                res.locals.cipo.kep = '/shoespic/' + req.file.filename;
            res.locals.cipo.hirdetve = 'Nem';
            res.locals.cipo.ar = req.body.ar
            res.locals.cipo._elado = res.locals.user._id;        
           
            res.locals.cipo.save(err => {
                if (err) {
                    return next(err);
                }
               
                return res.redirect('/user/' + req.session.userid + '/sajat/cipo');
            });
        }
    };
};
