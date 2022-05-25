const authMW = require('../middleware/auth/authMW');
const logoutMW = require('../middleware/auth/logoutMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const regUserMW = require('../middleware/auth/regUserMW')
const sendPwMW = require('../middleware/auth/sendPwMW')

const delCipoMW = require('../middleware/cipo/delCipoMW')
const getCipokMW = require('../middleware/cipo/getCipokMW')
const getCipoMW = require('../middleware/cipo/getCipoMW')
const saveCipoMW = require('../middleware/cipo/saveCipoMW')
const saveEditedCipoMW = require('../middleware/cipo/saveEditedCipoMW')
const hirdetCipoMW = require('../middleware/cipo/hirdetCipoMW')
const undoCipoMW = require('../middleware/cipo/undoCipoMW')
const vetelCipoMW = require('../middleware/cipo/vetelCipoMW')

const chargeUserMoneyMW = require('../middleware/user/chargeUserMoneyMW')
const delUserMW = require('../middleware/user/delUserMW')
const getUserMW = require('../middleware/user/getUserMW')
const getUsersMW = require('../middleware/user/getUsersMW')
const saveUserMW = require('../middleware/user/saveUserMW')
const changeUserPassMW = require('../middleware/user/changeUserPassMW.js')

const renderMW = require('../middleware/renderMW');
const res = require('express/lib/response');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const UserModel = require('../models/user');
const ShoesModel = require('../models/shoes');

module.exports = function (app, rootDir) {
    const objRepo = {
        UserModel: UserModel,
        ShoesModel: ShoesModel
    };

    app.use('/shoespic/:id',
        function(req,res,next) {
            res.sendFile(rootDir + '\\uploads\\' + req.params.id), {
                headers: {
                    'content-type' : 'image/png'
                }
            };
        });

    app.get('/user/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'profile'));

    app.post('/user/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        chargeUserMoneyMW(objRepo),
        changeUserPassMW(objRepo),
        saveUserMW(objRepo),
        renderMW(objRepo, 'profile'));
        
    app.use('/user/:userid/edit',
        authMW(objRepo),
        getUserMW(objRepo),
        saveUserMW(objRepo));
    
    app.get('/user/:userid/del',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipokMW(objRepo),
        delUserMW(objRepo));
        
    app.get('/user/:userid/sajat/cipo',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipokMW(objRepo),
        renderMW(objRepo, 'inventory'));
    
    app.use('/user/:userid/sajat/cipo/new',
        authMW(objRepo),
        upload.single('kep'),
        getUserMW(objRepo),
        saveCipoMW(objRepo),
        renderMW(objRepo, 'shoesEditNew'));
    
    app.use('/user/:userid/sajat/cipo/:cipoid/edit',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipoMW(objRepo),
        saveEditedCipoMW(objRepo),
        renderMW(objRepo, 'shoesEditNew'));
                
    app.get('/user/:userid/sajat/cipo/:cipoid/del',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipoMW(objRepo),
        delCipoMW(objRepo));
        
    app.get('/user/:userid/elado/cipo',
        authMW(objRepo),
        getUserMW(objRepo),
        getUsersMW(objRepo),
        getCipokMW(objRepo),
        renderMW(objRepo, 'store'));
        
    app.use('/user/:userid/elado/cipo/:cipoid/vetel',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipoMW(objRepo),
        vetelCipoMW(objRepo),
        saveUserMW(objRepo));
        
    app.get('/user/:userid/sajat/elado/cipo',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipokMW(objRepo),
        renderMW(objRepo, 'myAds'));
    
    app.use('/user/:userid/sajat/elado/cipo/:cipoid/hirdet',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipoMW(objRepo),
        hirdetCipoMW(objRepo),
        saveCipoMW(objRepo));
        
    app.use('/user/:userid/sajat/elado/cipo/:cipoid/undo',
        authMW(objRepo),
        getUserMW(objRepo),
        getCipoMW(objRepo),
        undoCipoMW(objRepo),
        saveCipoMW(objRepo));

    app.get('/', (req, res) => {
        res.redirect('/login');
    });

    app.use('/login',
        checkPassMW(objRepo),
        renderMW(objRepo, 'login'));

    app.use('/logout',
        logoutMW(objRepo));
	
    app.use('/sendmepw',
	    sendPwMW(objRepo),
        renderMW(objRepo, 'sendPassword'));

    app.use('/reg',
	    regUserMW(objRepo),
	    renderMW(objRepo, 'register'));    
};
