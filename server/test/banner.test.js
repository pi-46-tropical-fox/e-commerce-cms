const request = require('supertest')
const app = require(`../app`)
const {sequelize} = require(`../models`)
const {User, Banner} = require(`../models`)
const {encode} = require(`../helpers/jwt`)
const {queryInterface} = sequelize

let access_token = ``
let tokenLain = ``
let bannerId = ``

let newBanner = {
    name: `Chrismas is coming!`,
    description: `ini untuk diskon akhir tahun`,
    image_url: `http://image.com`,
    status: `active`
}

let editedBanner = {
    name: `Eid is coming!`,
    description: `ini untuk diskon lebaran`,
    image_url: `http://image2.com`,
    status: `active`
}

beforeAll((done) => {
    
    let user = {
        name: `admin`,
        email: `admin@email.com`,
        password: `12345`,
        role: `admin`
    }

    let user2 = {
        name: `admin`,
        email: `admin2@email.com`,
        password: `12345`,
        role: `no-admin`
    }


    User.create(user) 
    .then(result => {
        // console.log(result)
        let {id, name, email, role} = result
        access_token = encode({id, name, email, role})
        // console.log(access_token, `ini access token`)
        return User.create(user2)
    })
    .then(result => {
        let {id, name, email, role} = result
        tokenLain = encode({id, name, email, role})
        // console.log(access_token, `ini access token`)
        return Banner.create(newBanner)
    }) 
    .then(result => {
        bannerId = result.id
        done()
    })
    .catch(err => {
        // console.log(err)
        done(err)
    })
})

afterAll( async (done) => {
    try {
        await queryInterface.bulkDelete(`Banners`, {})
        await queryInterface.bulkDelete(`Users`, {})
        done()
    } catch(err) {
        done(err)
    }
});

describe(`Banner routes`, () => {
    
    describe(`GET /banners`, () => {
        
        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .get('/banners')
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .get('/banners')
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })


        test("200:OK, return json with all banners data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .get('/banners')
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)
                expect(body).toEqual(expect.any(Array))
                // console.log(`ini sebelum done`)
                done()
            })
            .catch(err => done(err))
        })
    })
    
    describe(`POST /banners`, () => {
        
        let bannerAdd = {
            name: `New year is coming!`,
            description: `ini untuk diskon akhir tahun`,
            image_url: `http://image3.com`,
            status: `active`
        }

        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .post('/banners')
            .send(bannerAdd)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .post('/banners')
            .send(bannerAdd)
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("201:created, return json with banner's data", (done) => {
            request(app)
            .post('/banners')
            .send(bannerAdd)
            .set(`access_token`, access_token)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(201)
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`name`, bannerAdd.name)
                expect(body).toHaveProperty(`image_url`, bannerAdd.image_url)
                expect(body).toHaveProperty(`description`, bannerAdd.description)
                expect(body).toHaveProperty(`status`, bannerAdd.status)
                expect(body).toHaveProperty(`createdAt`, expect.anything())
                expect(body).toHaveProperty(`updatedAt`, expect.anything())
                done()
            })
            .catch(err => done(err))
        })

        let nullResult = [
            `Name is required.`,
            `Description is required.`,
            `Image is required.`,
            `Status is required.`
        ]

        let emptyResult = [
            `Name must be filled!`,
            `Description must be filled!`,
            `Image must be provided!`,
            `Image must be in URL format!`,
            `Status must be filled!`
        ]

        let testBannerEmpty = {
            name: ``,
            image_url: ``,
            description: ``,
            status: ``
        }

        test("400:validation errors (empty fields), return json with error", (done) => {
            request(app)
            .post('/banners')
            .send(testBannerEmpty)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(emptyResult))
                done()
            })
            .catch(err => done(err))
        })

        test("400:validation errors (no data), return json with error", (done) => {
            request(app)
            .post('/banners')
            .send()
             .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(nullResult))
                done()
            })
            .catch(err => done(err))
        })
    })
    
    describe(`GET /banners/:id`, () => {
        
        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .get(`/banners/${bannerId}`)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .get(`/banners/${bannerId}`)
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("404:data not found, return json with error", (done) => {
            request(app)
            .get(`/banners/0`)
            .set(`access_token`, access_token)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(404)
                expect(body.message).toEqual(expect.stringContaining(`Can't find the data.`))
                done()
            })
            .catch(err => done(err))
        })

        test("200:OK, return json with banner's data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .get(`/banners/${bannerId}`)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)    
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`name`, newBanner.name)
                expect(body).toHaveProperty(`image_url`, newBanner.image_url)
                expect(body).toHaveProperty(`description`, newBanner.description)
                expect(body).toHaveProperty(`status`, newBanner.status)
                expect(body).toHaveProperty(`createdAt`, expect.anything())
                expect(body).toHaveProperty(`updatedAt`, expect.anything())
                done()
            })
            .catch(err => done(err))
        })
    })

    describe(`PUT /banners/:id`, () => {
        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .put(`/banners/${bannerId}`)
            .send(editedBanner)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .put(`/banners/${bannerId}`)
            .send(editedBanner)
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("200:OK, return json with banner's data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .put(`/banners/${bannerId}`)
            .send(editedBanner)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`name`, editedBanner.name)
                expect(body).toHaveProperty(`image_url`, editedBanner.image_url)
                expect(body).toHaveProperty(`description`, editedBanner.description)
                expect(body).toHaveProperty(`status`, editedBanner.status)
                expect(body).toHaveProperty(`createdAt`, expect.anything())
                expect(body).toHaveProperty(`updatedAt`, expect.anything())
                done()
            })
            .catch(err => done(err))
        })

        let emptyResult = [
            `Name must be filled!`,
            `Description must be filled!`,
            `Image must be provided!`,
            `Image must be in URL format!`,
            `Status must be filled!`
        ]

        let testBannerEmpty = {
            name: ``,
            image_url: ``,
            description: ``,
            status: ``
        }

        test("400:validation errors (empty fields), return json with error", (done) => {
            request(app)
            .put(`/banners/${bannerId}`)
            .send(testBannerEmpty)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(emptyResult))
                done()
            })
            .catch(err => done(err))
        })
    })

    describe(`DELETE /banners/:id`, () => {

        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .delete(`/banners/${bannerId}`)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .delete(`/banners/${bannerId}`)
            .set(`access_token`, tokenLain) 
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("404:data not found, return json with error", (done) => {
            request(app)
            .delete(`/banners/0`)
            .set(`access_token`, access_token)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(404)
                expect(body.message).toEqual(expect.stringContaining(`Can't find the data.`))
                done()
            })
            .catch(err => done(err))
        })

        test("200:OK, return json with banner's data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .delete(`/banners/${bannerId}`)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)
                expect(body.message).toEqual(expect.stringContaining(`Successfully delete banner '${editedBanner.name}'!`))
                done()
            })
            .catch(err => done(err))
        })
    })
})