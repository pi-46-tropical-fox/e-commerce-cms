const request = require('supertest');
const app = require('../app');
// const {User} = require('../models');

// afterAll(function(done) {
//     if(process.env.NODE_ENV == 'test') {
//         User.destroy({truncate:true})
//         .then(_ => {
//             done()
//         })
//         .catch(err => done(err))
//     }
// })

let user_data = {
    email: 'admin@mail.com',
    password: '1234',
    role:'admin'
    }

// describe('Register / Succes Case', () => {
//     test('Should send object with key: message,  id, email', (done) => {
//         request(app)
//             .post('/register')
//             .send(user_data)
//             .end(function(err, res) {
//                 if (err) throw err
//                 expect(res.status).toBe(201)
//                 expect(res.body).toHaveProperty('message','user success to register')
//                 expect(res.body).toHaveProperty('id', expect.any(Number))
//                 expect(res.body).toHaveProperty('email', user_data.email)
//                 expect(res.body).not.toHaveProperty('password')
//                 done()
//             })
//     })
// })

// describe('Register / Fail Case', () => {
//     test('fail because invalid format email', (done) => {
//         const wrongPassword = {...user_data, email:'johnmail.com'}
//         request(app)
//             .post('/register')
//             .send(wrongPassword)
//             .end(function(err, res) {
//                 const errors = ['Invalid email format']
//                 if (err) throw err
//                 expect(res.status).toBe(400)
//                 expect(res.body).toHaveProperty('errors', expect.any(Array))
//                 expect(res.body.errors).toEqual(expect.arrayContaining(errors))
//                 done()
//             })
//     })
//     test('fail because null password', (done) => {
//         const nullPassword = {...user_data}
//         delete nullPassword.password
//         request(app)
//             .post('/register')
//             .send(nullPassword)
//             .end(function(err, res) {
//                 const errors = ['Password is required']
//                 if (err) throw err
//                 expect(res.status).toBe(400)
//                 expect(res.body).toHaveProperty('errors', expect.any(Array))
//                 expect(res.body.errors).toEqual(expect.arrayContaining(errors))
//                 done()
//             })
//     })
// })

describe('test user login POST /login', function(){
    test('Test success login reponds with json', function(done){
        request(app)
        .post('/login')
        .send(user_data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('access_token', expect.any(String))
            expect(res.body).toHaveProperty('email', user_data.email)
            done()
        })
    })
})

// describe ('Login / Fail Case', () => {
//     test('fail login wrong password', (done) => {
//         const wrongPassword = {...user_data, password:'12'}
//         request(app)
//             .post('/login')
//             .send(wrongPassword)
//             .then(response => {
//                 // console.log(response.statusCode, '<<<<< ini response');
//                 const {body,statusCode} = response
//                 expect(statusCode).toBe(400)
//                 expect(body).toHaveProperty('message', 'Username/password wrong')
//                 done()
//             })            
//     })

//     test('email not registered', (done) => {
//         const wrongEmail = {email:'asala@gmail.com', password:'1234'}
//         request(app)
//             .post('/login')
//             .send(wrongEmail)
//             .expect('Content-Type', /json/)
//             .then(response => {
//                 // console.log(response.body, '<<<<< ini response');
//                 const {body,statusCode} = response
//                 expect(statusCode).toBe(400)
//                 expect(body).toHaveProperty('message', 'Username/password wrong')
//                 done()
//             })            
//     })

//     test('Empty email dan password', (done) => {
//         const emptyEmail = {email:'', password:''}
//         request(app)
//             .post('/login')
//             .send(emptyEmail)
//             .expect('Content-Type', /json/)
//             .then(response => {
//                 // console.log(response.body, '<<<<< ini response');
//                 const {body,statusCode} = response
//                 expect(statusCode).toBe(400)
//                 expect(body).toHaveProperty('message', 'Username/password wrong')
//                 done()
//             })            
//     })
    
// })
