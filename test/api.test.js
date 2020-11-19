import server from '../src/server/index.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
// const assert = chai.assert;

import User from '../src/server/models/users.js';

describe('test : index', () => {

  it('Should get OK on /', () => {
    return chai.request(server)
      .get('/')
      .then(function (res) {
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.equal('success');
        res.body.message.should.eql('hello, world!');
      })
      .catch(function (error) {
        throw error;
      });
  });

});

describe('test : user', () => {

  // after(() => User.deleteOne({username: 'testName'}, (err) => console.log('deleteOne error', err)));

  it('Should register new User', () => {
    return chai.request(server)
      .post('/auth/register')
      .type('form')
      .send({
        username: 'testName',
        password: 'testPassword'
      })
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((error) => {
        throw error;
      });
  });

});

describe('test : user', () => {

  it('Should login', () => {
    return chai.request(server)
      .get('/auth/login')
      .type('form')
      .send({
        username: 'testName',
        password: 'testPassword'
      })
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((error) => {
        throw error;
      });
  });

});
