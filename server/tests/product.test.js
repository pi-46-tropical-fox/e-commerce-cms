const jwt = require('jsonwebtoken')
const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

const userData = {email: 'admin1@gmail.com', password: '123456'}
let access_token = ''

beforeAll((done) => {
    //misal mau generate token sebelum test get product
    User.findOne({where:{email:userData.email}})
    .then(user => {
        // console.log(user, 'ini user di beforeAll')
        access_token = jwt.sign({email:user.email}, 'kampretochocolatos')
        done()
    })
    .catch(err =>{
        // console.log(err, 'error di beforeAll')
        done()
    } )

})

describe('test get Item  GET /items', function(){
    test('Test success get items responds with json', function(done){
        request(app) // http://localhost:3000
        .get('/products') //method type
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response get')
            const {body, status} = response
            expect(status).toBe(200)
            body.forEach(datum => {
                expect(datum).toHaveProperty('name', expect.any(String))
            })
            done()
        })
    })
})