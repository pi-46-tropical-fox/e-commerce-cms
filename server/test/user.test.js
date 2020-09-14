const request = require('supertest')
const app = require('../app')

describe('test user login POST /login', function(){
    test('Test success login reponds with json', function(done){
        request(app)
        .post('/login')
        .send({email:"admin@mail.com",password:"1234"})
        .then(response => {
            const {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
})

describe('test user login POST /login', function(){
    test('invalid password', function(done){
        request(app)
        .post('/login') 
        .send({email:"admin@mail.com",password:"123234"})
        .then(response => {
            const { body , status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty(Object.keys(response.body))
            done()
        })
    })

    test('no email',function(done){
        request(app)
        .post('/login')
        .send({email:"",password:"1234"})
        .then(response=>{
            const { body , status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty(Object.keys(response.body))
            done()
        })
    })

    test('no email & password',(done)=>{
        request(app)
        .post('/login')
        .send({email:"",password:""})
        .then(response=>{
            const { body , status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty(Object.keys(response.body))
            done()
        })
    })
})