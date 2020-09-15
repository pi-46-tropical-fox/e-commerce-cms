const request = require('supertest')
const app = require('../app')
const {queryInterface} = sequelize
let access_token = ''
let sendProductValid =  {
                    name:'Contoh Handphone',
                    image:'URL Image',
                    price : 50000,
                    stock: 20
                }
let sendProductInvalid =  {
                    name:'Contoh Handphone',
                    image:'URL Image',
                    price : 50000,
                    stock: 20
                }

berforeAll(() => {
    queryInterface.bulkDelete('Products', {})
    .then(()=>{
        'Hapus Produk Berhasil'
    })
    .catch(err => {
        console.log(err);
    })
})

describe('POST /products', ()=>{
    it('Test for add products succes', (done) => {
        request(app)
        .post('/products')
        .send(sendProductValid)
        .set('accept', 'aplication/json')
        .set('access_token', access_token)
        .then(respons => {
            id = respons.body.id,
            expect(respons.status).toBe(201)
            done()
        })
    })

    it('test without token', (done)=> {
        request(app)
        .post('/products')
        .send(sendProductValid)
        .set('accept', 'aplication/json')
        .then(respons => {
            const {status, body} = respons

            expect(status).toBe(401)
            expect(body).toHaveProperty('Error COde', 'Forbidden')
            done()
        })
    })
})