const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User, Product } = require("../models");
const { verify, generate } = require("../helper/jwt");
const { queryInterface } = sequelize;

let token = "";
let access_token = "";
let id = null

beforeAll( async () => {
  let user = {
    email:"kang-admin@mail.com",
    password:"admin",
    role:"admin",
  };

  let user2 = {
    email:"non-admin@mail.com",
    password:"bukanadmin",
    role: "bukan-admin",
  };

  let userAdmin = await User.create(user)
  access_token = generate(userAdmin)

  let nonAdmin = await User.create(user2)
  token = generate(nonAdmin)
});

afterAll(async (done)=>{
    try {
        await queryInterface.bulkDelete("Products",{})
        await queryInterface.bulkDelete("Users",{})
        done()
    }
    catch(err){
        done(err)
    }
})


// SUCCESS

// CREATE
describe(`creating new product`,()=>{
    test(`success create`,(done)=>{
        request(app)
        .post('/products')
        .send({
            name:"Sepatu Bola",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:5
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            id = body.id
            expect(status).toBe(201)
            expect(response).toHaveProperty('body',expect.any(Object))
            done()
        })
    })
})


// EDIT
describe(`editing product`,()=>{
    test(`editing success`,(done)=>{
        request(app)
        .put(`/products/22`)
        .send({
            name:"Sepatu Bola edited",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:5
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(200)
            expect(response).toHaveProperty('body',expect.any(Object))
            done()
        })
    })
})

//DELETE
describe(`deleting product`,()=>{
    test(`delete success`,(done)=>{
        request(app)
        .delete(`/products/22`)
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            done()
        })
    })
})


// FAIL

// CREATE
describe(`creating new product`,()=>{
    test(`no name`,(done)=>{
        request(app)
        .post(`/products`)
        .send({
            name:"",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:5
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`no image`,(done)=>{
        request(app)
        .post(`/products`)
        .send({
            name:"Sepatu Bole",
            image_url:'',
            price:500000,
            stock:5
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })


    test(`no price`,(done)=>{
        request(app)
        .post(`/products`)
        .send({
            name:"Sepatu Bole",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:0,
            stock:5
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })


    test(`no stock`,(done)=>{
        request(app)
        .post(`/products`)
        .send({
            name:"Sepatu Bole",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:0
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`role not admin`,(done)=>{
        request(app)
        .post('/products')
        .send({
            name:"Sepatu Bola",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:5
        })
        .set('access_token',token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(403)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`no access_token`,(done)=>{
        request(app)
        .post('/products')
        .send({
            name:"Sepatu Bola",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:5
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })
})


// EDIT

describe(`editing product`,()=>{
    test(`no access token`,(done)=>{
        request(app)
        .put(`/products/22`)
        .send({
            name:"Sepatu Bola edited",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:5
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`not admin`,(done)=>{
        request(app)
        .put(`/products/22`)
        .send({
            name:"Sepatu Bola edited",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:5
        })
        .set('access_token',token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(403)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`no stock`,(done)=>{
        request(app)
        .put(`/products/22`)
        .send({
            name:"Sepatu Bola edited",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:500000,
            stock:0
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`no price`,(done)=>{
        request(app)
        .put(`/products/22`)
        .send({
            name:"Sepatu Bola edited",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:0,
            stock:5
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`price string`,(done)=>{
        request(app)
        .put(`/products/22`)
        .send({
            name:"Sepatu Bola edited",
            image_url:'https://cf.shopee.co.id/file/f79397aeb8b0d39332df44acd05a84d2',
            price:"",
            stock:5
        })
        .set('access_token',access_token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })
})

// DELETE
describe(`deleting product`,()=>{
    test(`no access token`,(done)=>{
        request(app)
        .delete(`/products/22`)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })

    test(`not admin`,(done)=>{
        request(app)
        .delete(`/products/22`)
        .set('access_token',token)
        .then(response=>{
            const {body,status} = response
            expect(status).toBe(403)
            expect(body).toHaveProperty('errors',expect.any(Array))
            done()
        })
    })
})
