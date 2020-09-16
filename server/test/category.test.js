const request = require('supertest')
const app = require('../app')
const {User, Category} = require('../models')
const {generateToken} = require('../helpers/jwt')

let access_token

beforeAll((done) => {
    if(process.env.NODE_ENV === 'test'){
            let user_data =   {
                firstName: 'Abdul',
                lastName: 'Fattah',
                email: 'abdul@mail.com',
                password: '123456',
                role: 'admin'
            }
            User.create(user_data)
        .then(user => {
            access_token = generateToken(user)
            return done()  
        })
        .catch(err => {
            return done(err)
        })
    }
})

afterAll((done) => {
    if(process.env.NODE_ENV === 'test'){
        User.destroy({truncate: true})
        .then(_ => {
            return done()
        })
        .catch(err => {
            return done(err)
        })
    }
})

describe('Test GET /categories', () => {
    //Success Case
    describe('Success get all category', () => {
        test('Should send array of object with statusCode 200', (done) => {
            request(app)
                .get('/categories')
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        expect(res.status).toBe(200)  
                        expect(res.body).not.toBeFalsy()
                        return done()
                    }
                })
        })
    })

    //Failed Case
    describe('Failed to get all category', () => {
        test('Because of user not authenticated', (done) => {
            let invalid_access_token = ''
            request(app)
                .get('/categories')
                .set('access_token', invalid_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['User not authenticated']
                        expect(res.status).toBe(401)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
    })
})