const request = require('supertest');
const app = require('../server');
const { sequelize, Admin } = require('../models');
const { queryInterface } = sequelize;

beforeAll(done => {
  Admin.create({email: 'admin@gmail.com', password:'rahasia'})
    .then(_ => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

afterAll(done => {
  queryInterface
    .bulkDelete('Admins', {})
    .then(() => done())
    .catch(err => done(err))
});

describe('Admin routes',()=>{
  describe('Post /admin/login',()=>{
    it('Valid login',(done)=>{
      return request(app)
        .post('/admin/login')
        .send({email: 'admin@gmail.com', password:'rahasia'})
        .then(response=>{
          let {status, body} = response
          expect(status).toBe(200)
          done()
        })
    })
    it('Invalid login, email not found',(done)=>{
      return request(app)
        .post('/admin/login')
        .send({email:'admin2@gmail.com', password: 'rahasia'})
        .then(response=>{
          let {status,body} = response
          expect(status).toBe(404)
          done()
        })
    })

    it('Invalid login, wrong password',(done)=>{
      return request(app)
        .post('/admin/login')
        .send({email:'admin@gmail.com', password: 'rasia'})
        .then(response=>{
          let {status,body} = response
          expect(status).toBe(401)
          done()
        })
    })
  })
})