const { hook, test, queryInterface } = require('./base')
const errors = require('./errors')

const URL = '/auth/login'

// defining inputs

const email = 'administrator@rgb-commerce.com'
const password = 'administrator'

const inputSuccess = { email, password }
const inputFails = [
    { email, password: "" },
    { email: '', password },
    { email, password: "dnjsak" },
    { email: "dhsjabndkas", password },
]

// defining error message(s)

const WRONG_CRED_ERROR = [`Oops! Seems like you've entered wrong credentials.`]

// creates the record(s) BEFORE the test begins

// deletes database record(s) AFTER the test is done
afterAll(done => {
    queryInterface.bulkDelete('Users')
        .then(() => done())
        .catch((e) => done())
})

const reqs = [
    // Success - Test Case
    {
        desc: 'POST /auth/login',
        tests: [
            {
                it: 'should successfully logs the user in',
                hookURL: hook('post')(URL),
                payload: [
                    inputSuccess
                ],
                expectsBefore: [
                    { key: 'Content-Type', value: /json/ }
                ],

                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 200 }
                    ],
                    body: [
                        { type: 'object', key: 'name', value: expect.any(String) },
                        { type: 'object', key: 'email', value: expect.any(String) },
                        { type: 'object', key: 'picture', value: null },
                        { type: 'object', key: 'access_token', value: expect.any(String) },
                    ]
                }
            }
        ]
    },

    // Fail - Test Cases
    
    // Login fail test case(s)
    {
        desc: 'FAIL - POST /auth/login',
        tests: [
            {
                it: 'should throw HTTP 401 error for empty password',
                hookURL: hook('post')(URL),
                payload: inputFails, // payload in array of objects
                expectsBefore: [
                    { key: 'Content-Type', value: /json/ }
                ],
                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 401 }
                    ],
                    body: [
                        { type: 'equal', value: expect.arrayContaining(WRONG_CRED_ERROR) }
                    ]
                }
            },
        ]
    },
]

test(reqs)