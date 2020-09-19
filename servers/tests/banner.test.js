if (process.env.NODE_ENV === "development") {
    const request = require("supertest");
}
const app = require(`../app`)
const {User, Banner} = require(`../models`)
const {encode} = require(`../helpers/jwt`)
const {sequelize} = require(`../models`)
const {queryInterface} = sequelize

let access_token = ''
let customer_access_token = ''
let bannerExmp = {}

beforeAll( async done => {
    const user1 = {
        email: 'admin1@mail.com',
        password: '1234',
        role: 'admin'
    }

    const user2 = {
        email: 'customer1@mail.com',
        password: '1234'
    }

    const product1 = {
        title: 'customer1@mail.com',
        image_url: '1234'
    }

    try{
        const user = await User.create(user1)
        const customer_user = await User.create(user2)
        
        const email1 = user.email
        const id1 = user.id
        const email2 = customer_user.email 
        const id2 = customer_user.id
        access_token = encode(email1, id1, user.role)
        customer_access_token = encode(email2, id2, customer_user.role)

        const banner = await Banner.create(product1)
        bannerExmp = banner
        done()
    } catch(err) {
        done(err)
    }
})

afterAll( async (done) => {
    try{
        await queryInterface.bulkDelete('Users', {})
        await queryInterface.bulkDelete('Banners', {})
        done()
    } catch (err) {
        done(err)
    }
})

describe('POST /banners', () => {
    //Input Data
    const input = {
        title: 'Kimetsu no yaiba', 
        image_url: 'https://fsb.zobj.net/crop.php?r=VTsTwAWPh7a57DvdJ4xHg42aE0q1Gx4rDZyYnHAnbRFgHo1af9cqDfVfbW4zb5GACOOJTmuXeShmpmQyZTdyqC2qhZKLH7_I39DBFfybj0sP1udO57NRr4DpAZwIGBXstHn_JdeWhqk7DBIr', 
    }

    //If any empty required field
    const input2 = {
        title: '', 
        image_url: input.image_url
    }

    //Wrong data type
    const input5 = {
        title: input.title, 
        image_url: input.image_url
    }

    //Test if add products success
    test('Successfully add new product', done => {
        request(app)
          .post('/banners')
          .send(input)
          .set('access_token', access_token)
          .then(response => {
            const {body, status} = response
            expect(status).toBe(201)
            expect(body.data).toHaveProperty("title", "Kimetsu no yaiba")
            expect(body.data).toHaveProperty("image_url", "https://fsb.zobj.net/crop.php?r=VTsTwAWPh7a57DvdJ4xHg42aE0q1Gx4rDZyYnHAnbRFgHo1af9cqDfVfbW4zb5GACOOJTmuXeShmpmQyZTdyqC2qhZKLH7_I39DBFfybj0sP1udO57NRr4DpAZwIGBXstHn_JdeWhqk7DBIr")
            expect(body).toHaveProperty("message", "Successfully create new product")
            done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
    
    //Test if add product failed
    //Erros message
    const userNotAuth = ["User is not authenticated"]
    const forbiddenAccess = ["Forbidden Access, only admin can manage the product"]
    const productNotFound = ["Product not found"]
    const emptyRequiredField = [
        "Name minimum is three and maximun fifty",
        "Name can not be empty"
    ]

    test('Not Insert Access Token', done => {
        request(app)
          .post('/banners')
          .send(input)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(401)
              expect(body).toHaveProperty("errors", userNotAuth)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Access Token not belongs to admin', done => {
        request(app)
          .post('/banners')
          .send(input)
          .set("access_token", customer_access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", forbiddenAccess)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Empty required field', done => {
        request(app)
          .post('/banners')
          .send(input2)
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", emptyRequiredField)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})

describe(`GET /banners`, () => {
    test('Get All banners', done => {
        request(app)
          .get('/banners')
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(200)
              expect(body).toHaveProperty("data", expect.any(Object))
              done()
            })
            .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})

describe(`PUT /banners/:id`, () => {
    test('Success fully Get All banners', done => {
        request(app)
          .put(`/banners/${bannerExmp.id}`)
          .send({
              title: "One piece",
              image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg"
          })
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(200)
              expect(body).toHaveProperty("message", "Successfully update product")
              done()
            })
            .catch((err) => {
              console.log(err)
              done(err)
          })
    })


    // FAILED TES
    //Erros message
    const userNotAuth = ["User is not authenticated"]
    const forbiddenAccess = ["Forbidden Access, only admin can manage the product"]
    const productNotFound = ["Product not found"]
    const emptyRequiredField = [
        "Name minimum is three and maximun fifty",
        "Name can not be empty"
    ]
    const stockIsMinus = ["Stock must be minimum 0"]
    const priceIsMinus = ["Price must be minimum 2000"]
    const wrongDataType = [
        "Price must only contain number",
        "Stock must only contain number"
    ]

    test('Not Insert Access Token', done => {
        request(app)
          .put(`/banners/${bannerExmp.id}`)
          .send({
            title: "One piece",
            image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg"
          })
          .then(response => {
              const {body, status} = response
              expect(status).toBe(401)
              expect(body).toHaveProperty("errors", userNotAuth)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Access Token not belongs to admin', done => {
        request(app)
          .put(`/banners/${bannerExmp.id}`)
          .send({
            title: "One piece",
            image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg"
          })
          .set("access_token", customer_access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", forbiddenAccess)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})

describe('DELETE /banners/:id', () => {
    test('Successfully delete banners', done => {
        request(app)
          .delete(`/banners/${bannerExmp.id}`)
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(200)
              expect(body).toHaveProperty("message", "Successfully delete product")
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Not include access_token', done => {
        request(app)
          .delete(`/banners/${bannerExmp.id}`)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(401)
              expect(body).toHaveProperty("errors", [
                "User is not authenticated"
              ])
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Access_token not belongs to admin', done => {
        request(app)
          .delete(`/banners/${bannerExmp.id}`)
          .set("access_token", customer_access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", ["Forbidden Access, only admin can manage the product"])
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})