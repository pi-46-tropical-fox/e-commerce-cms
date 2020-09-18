const { hook, test, queryInterface } = require('./base')
const { User, Banner } = require('../models')
const { makeToken } = require('../helpers/jwt')
const errors = require('./errors')

const URL = '/banners'

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

const banner_name = 'Led Strips'
const banner_title = 'Led Strips'
const banner_description = 'Lorem ipsum dolor sit amat dah.'

const inputSuccess = { name: banner_name, banner_title, banner_description }

const nameInputFails = [
    { name: '', banner_title, banner_description } // 400 - name should not be empty!
]

const titleInputFails = [
    { name: banner_name, banner_title: "", banner_description } // 400 - name should not be empty!
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
    queryInterface.bulkDelete('banners')
        .then(() => done())
        .catch((e) => done())
    queryInterface.bulkDelete('banners')
        .then(() => done())
        .catch((e) => done())
    queryInterface.bulkDelete('Users')
        .then(() => done())
        .catch((e) => done())
})

const reqs = [
    // Success - Test Cases
    {
        desc: 'POST /banners',
        tests: [
            {
                it: 'should successfully post a new banner',
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
        desc: 'GET /banners',
        tests: [
            {
                it: 'should successfully list banners',
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
        desc: 'GET /banners/:id',
        tests: [
            {
                it: 'should successfully get details from a banner',
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
        desc: 'PUT /banners',
        tests: [
            {
                it: 'should successfully update a banner',
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
        desc: 'DELETE /banners',
        tests: [
            {
                it: 'should successfully delete a banner',
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
                it: 'should throw HTTP 400 error if banner name is absent',
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
            {
                it: 'should throw HTTP 400 error if banner title is absent',
                hookURL: hook('post')(URL),
                headers,
                payload: titleInputFails, // payload in array of objects
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