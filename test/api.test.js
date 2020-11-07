import app from '../src/server/index';
import supertest from 'supertest';
import chai from 'chai';

const temp = {};
const request = supertest(app);
// const should = chai.should();

describe('POST auth/register', () => {
  beforeEach(() => {
    // ...
  });

  it('should get OK on /', async() => {
    request
      .post('/')
      .set('Accept', 'application/json')
      .send()
      .expect(200)
  });

  it('should post new user', async() => {
    request
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'testName',
        password: 'testPassword'
      })
      .expect(200)
      .then((res) => {
        temp.token = res.body.token;
      });
  });
});