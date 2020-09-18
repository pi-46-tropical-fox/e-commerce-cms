const { hook, test, queryInterface } = require('./base')
const { User, category, Category } = require('../models')
const { makeToken } = require('../helpers/jwt')
const errors = require('./errors')

const URL = '/categories'

// defining inputs

const name = 'Administrator'
const email = 'administrator2@rgb-commerce.com'
const password = 'administrator2'
const RoleId = 1

const data = { name, email, password, RoleId }
let access_token = ''
let id = 1
let headers = [
    { key: 'Accept', value: 'application/json' },
]

// creating inputs...

const category_name = 'Led Strips'
const category_description = 'Lorem ipsum dolor sit amat dah.'

const inputSuccess = { name: category_name, description: category_description }

const nameInputFails = [
    { name: "", description: category_description } // 400 - name should not be empty!
]

// defining error message(s)

// creates needed data and record(s) BEFORE the test begins
beforeAll(done => {
    User.create(data)
        .then(user => {
            access_token = makeToken({ name, email, picture: user.picture })
            headers.push({ key: 'access_token', value: access_token })

            done()
        })
        .catch((e) => {
            done()
        })
})

// deletes database record(s) AFTER the test is done
afterAll(done => {
    queryInterface.bulkDelete('categories')
        .then(() => done())
        .catch((e) => done())
    queryInterface.bulkDelete('Categories')
        .then(() => done())
        .catch((e) => done())
    queryInterface.bulkDelete('Users')
        .then(() => done())
        .catch((e) => done())
})

const reqs = [
    // Success - Test Cases
    {
        desc: 'POST /categories',
        tests: [
            {
                it: 'should successfully post a new category',
                hookURL: hook('post')(URL),
                headers,
                payload: [
                    inputSuccess
                ],
                expectsBefore: [
                    { key: 'Content-Type', value: /json/ }
                ],

                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 201 }
                    ],
                    body: [
                        { type: 'object', key: 'message', value: expect.any(String) },
                    ]
                }
            }
        ]
    },
    {
        desc: 'GET /categories',
        tests: [
            {
                it: 'should successfully list categories',
                hookURL: hook('get')(URL),
                headers,
                expectsBefore: [
                    { key: 'Content-Type', value: /json/ }
                ],
                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 200 }
                    ],
                    body: [
                        { type: 'object', key: 'data', value: expect.any(Array) },
                    ]
                }
            }
        ]
    },
    {
        desc: 'GET /categories/:id',
        tests: [
            {
                it: 'should successfully get details from a category',
                hookURL: hook('get')(`${URL}/${id}`),
                headers,
                expectsBefore: [
                    { key: 'Content-Type', value: /json/ }
                ],
                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 200 }
                    ],
                    body: [
                        { type: 'object', key: 'data', value: expect.any(Object) },
                    ]
                }
            }
        ]
    },

    {
        desc: 'PUT /categories',
        tests: [
            {
                it: 'should successfully update a category',
                hookURL: hook('put')(`${URL}/${id}`),
                headers,
                payload: [
                    inputSuccess
                ],
                // expectsBefore: [
                //     { key: 'Content-Type', value: /json/ }
                // ],

                expectsAfter: { // must be inside of `response` object properties
                    statusCode: [
                        { type: 'exact', value: 200 }
                    ],
                    body: [
                        { type: 'object', key: 'message', value: expect.any(String) },
                    ]
                }
            }
        ]
    },

    {
        desc: 'DELETE /categories',
        tests: [
            {
                it: 'should successfully delete a category',
                hookURL: hook('delete')(`${URL}/${id}`),
                headers,

                // expectsBefore: [
                //     { key: 'Content-Type', value: /json/ }
                // ],

                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 200 }
                    ],
                    body: [
                        { type: 'object', key: 'message', value: expect.any(String) },
                    ]
                }
            }
        ]
    },

    // Fail - Test Cases

    // Unauthorized test case
    {
        desc: 'FAIL Case 1: 401 Unauthorized',
        tests: [
            {
                // should fail even though we put the data properly
                it: 'should throw HTTP 401 error for unauthorized inputs',
                hookURL: hook('post')(URL),
                payload: [
                    inputSuccess
                ],
                headers: [
                    { key: 'Accept', value: 'application/json' },
                ],
                expectsBefore: [
                    { key: 'Content-Type', value: /json/ }
                ],
                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 401 }
                    ],
                    body: [
                        { type: 'equal', value: expect.any(Array) },
                    ]
                }
            },
        ]
    },
    {
        desc: 'FAIL Case 2: 400 Bad Request',
        tests: [
            {
                it: 'should throw HTTP 400 error if category name is absent',
                hookURL: hook('post')(URL),
                headers,
                payload: nameInputFails, // payload in array of objects
                expectsBefore: [
                    { key: 'Content-Type', value: /json/ }
                ],
                expectsAfter: {
                    statusCode: [
                        { type: 'exact', value: 400 }
                    ],
                    body: [
                        { type: 'equal', value: expect.any(Array) }
                    ]
                }
            },
        ]
    },
]

test(reqs)