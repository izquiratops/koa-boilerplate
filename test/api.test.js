import passport from 'koa-passport';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const should = chai.should();

import server from '../src/server/index.js';
import User from '../src/server/models/users.js';

describe('Auth methods without stub', () => {

    after(() => User.deleteOne({username: 'testingNewUser'}, (err) => console.error('deleteOne ', err)))

    it('GET /auth/register Ok', () => {
        return chai.request(server)
            .get('/auth/register')
            .then((res) => {
                res.status.should.eql(200);
                res.type.should.eql('text/html');
                res.text.should.contain('<h1>Register</h1>');
            });
    });

    it('POST /auth/register Ok', () => {
        return chai.request(server)
            .post('/auth/register')
            .send({
                username: 'testingNewUser',
                password: '1234'
            })
            .then((res) => {
                res.status.should.eql(200);
            });
    });

    it('POST /auth/register Fail on duplicate usernames', () => {
        return chai.request(server)
            .post('/auth/register')
            .send({
                username: 'testingNewUser',
                password: '1234'
            })
            .then((res) => {
                res.status.should.eql(422);
            });
    });

    it('GET /auth/login Ok', () => {
        return chai.request(server)
            .get('/auth/login')
            .then((res) => {
                res.status.should.eql(200);
                res.type.should.eql('text/html');
                res.text.should.contain('<h1>Login</h1>');
            });
    });

    it('POST /auth/login Ok', () => {
        return chai.request(server)
            .post('/auth/login')
            .send({
                username: 'testingNewUser',
                password: '1234'
            })
            .then((res) => {
                res.status.should.eql(200);
            });
    });

    it('POST /auth/login Fail on wrong password', () => {
        return chai.request(server)
            .post('/auth/login')
            .send({
                username: 'testingNewUser',
                password: 'wrongPassword'
            })
            .then((res) => {
                res.status.should.eql(400);
            });
    });

});

describe('Auth methods with stub', () => {

    beforeEach(() => {
        // ...
    });

    afterEach(() => {
        // ...
    });

    before(async () => {
        return await new User({
            username: 'testingNewUser2',
            password: '1234'
        }).save();
    });

});
