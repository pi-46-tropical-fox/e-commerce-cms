const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

// EXPERIMENTAL - dynamic hooks via currying functions
// https://github.com/visionmedia/supertest/issues/398#issuecomment-607463304
// currying arrow functions => https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript

const hook = (method = 'post') => (args) =>
    request(app)
    [method](args)

// begin testing each

const expectEach = (res, key, requirement) => {
    switch (requirement.type) {
        case 'object':
            expect(res[key]).toHaveProperty(requirement.key, requirement.value)
            break
        case 'equal':
            console.log("[res[key], key, requirement] ->", res[key], key, requirement);
            expect(res[key]).toEqual(requirement.value)
            break
        case 'exact':
            expect(res[key]).toBe(requirement.value)
            break
        default:
            break
    }
}

const batchExpects = (res, test) => {
    let keys = Object.keys(test.expectsAfter)
    keys.forEach(key => {
        test.expectsAfter[key].forEach(requirement => {
            expectEach(res, key, requirement)
        })
    })
}

const testEach = (test) => {
    it(test.it, (done) => {
        const request = test.hookURL
        console.log("test.payload contains ->", test.payload);
        if (test.headers) test.headers.forEach(header => request.set(header.key, header.value))
        if (test.payload) test.payload.forEach(data => request.send(data))
        if (test.expectsBefore) test.expectsBefore.forEach(data => request.expect(data.key, data.value))
        request
            .set('Accept', 'application/json')
            .then(response => {
                batchExpects(response, test)
                done()
            })
    })
}

const describeEach = (requirement) => {
    describe(requirement.desc, () => {
        requirement.tests.forEach(test => {
            testEach(test)
        })
    })
}

const test = (requirements) => {
    requirements.forEach(requirement => {
        describeEach(requirement)
    })
}

module.exports = {
    queryInterface, test, hook
}