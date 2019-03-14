import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { endianness } from 'os';

const {
    expect
  } = chai;

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup', () =>{
    it('should return the data of the created user', (done) =>{
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName: 'Copain',
            lastName: 'Fabrice',
            email: 'bienaime.fabrice@andela.com',
            password: '2423K!'
        })
        .end((err, res) =>{
            expect(req.body.firstName).to.equal('Copain');
            expect(req.body.lastName).to.equal('Fabrice');
            expect(req.body.email).to.equal('bienaime.fabrice@andela.com');
            done();
        })
    })
});

describe('login ',() =>{
    describe('POST /api/v1/auth/login', () =>{
        it('it should return the user information if the user exists', () =>{
            chai.request(chai)
            .post('/api/v1/auth login')
            .send({
                email: 'bienaime.fabrice@andela.com',
                password: '2423K!'
            })
            .end((err, res) =>{
                expect(res.status).to.equal(200);
                expect(Object.keys(res.body.data).legnth).to.be.above(0);
                (done);
            })
        })
    })
});