import app from '../src/server';
import supertest from 'supertest';
import chai from 'chai';

import User from '../src/server/models/users';

const temp = {};
const request = supertest.agent(app.listen());
const should = chai.should();

describe('test : auth', () => {

  it('should get OK on /', done => {
    request
      .post('/')
      .set('Accept', 'application/json')
      .send()
      .expect(200, (err, res) => {
        done();
      })
  });

  it('should post new user', done => {
    request
      .post('/auth/user')
      .set('Accept', 'application/json')
      .send({
        name: 'testName',
        password: 'testPassword'
      })
      .expect(200, (err, res) => {
        temp.token = res.body.token;
        done();
      })
  });
});