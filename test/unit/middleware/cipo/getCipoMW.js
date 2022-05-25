var expect = require('chai').expect;
var getCipoMW = require('../../../../middleware/cipo/getCipoMW');

describe('getCipo middleware ', function () {

    it('should set res.locals.cipo with a cipo object from db', function (done) {
        const mw = getCipoMW({
            ShoesModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '13'})
                    cb(null, 'mockcipo')
                }
            }
        });

        const resMock={
            locals: {}
        };

        mw({
            params: {
                cipoid: '13'
            }
        },  
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({cipo: 'mockcipo'})
            done();
        });
    });

    it('should call next with error when there is a db problem', function (done) {
        const mw = getCipoMW({
            ShoesModel: {
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
                cipoid: '13'
            }
        },  
        resMock,
        (err) => {
            expect(err).to.be.eql('dbHiba');
            done();
        });
    });

    it('should call next when no cipo found in the db', function (done) {
        const mw = getCipoMW({
            ShoesModel: {
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
                cipoid: '13'
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
