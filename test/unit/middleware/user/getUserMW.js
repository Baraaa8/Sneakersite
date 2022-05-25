var expect = require('chai').expect;
var getUserMW = require('../../../../middleware/user/getUserMW');

describe('getUser middleware ', function () {

    it('should set res.locals.user with a user object from db', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '13'})
                    cb(null, 'mockuser')
                }
            }
        });

        const resMock={
            locals: {}
        };

        mw({
            params: {
                userid: '13'
            }
        },  
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({user: 'mockuser'})
            done();
        });
    });

    it('should call next with error when there is a db problem', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '13'})
                    cb('dbHiba', null)
                }
            }
        });

        const resMock={
            locals: {}
        };

        mw({
            params: {
                userid: '13'
            }
        },  
        resMock,
        (err) => {
            expect(err).to.be.eql('dbHiba');
            done();
        });
    });

    it('should call next when no user found in the db', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '13'})
                    cb(undefined, null)
                }
            }
        });

        const resMock={
            locals: {}
        };

        mw({
            params: {
                userid: '13'
            }
        },  
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({})
            done();
        });
    });
});
