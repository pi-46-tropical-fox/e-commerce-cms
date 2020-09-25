const { hook, test, queryInterface } = require('./base')
const { User, Product, Category } = require('../models')
const { makeToken } = require('../helpers/jwt')
const errors = require('./errors')

const URL = '/products'

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

const product_name = 'Led Strip Lights'
const product_price = 16.88
const product_stock = 40
// const product_images = [
//     'https://images-na.ssl-images-amazon.com/images/I/71BAmMmeeRL._AC_SX679_.jpg',
//     'https://images-na.ssl-images-amazon.com/images/I/61kPXvkAcYL._AC_SX679_.jpg'
// ]

const inputSuccess = { name: product_name, price: product_price, stock: product_stock, CategoryId: 1 }

const noCategoryIdInputFails = [
    { name: product_name, price: product_price, stock: product_stock } // 400 - You should specify the category!
]

const nameInputFails = [
    { name: "", price: product_price, stock: product_stock, CategoryId: 1 } // 400 - name should not be empty!
]

const priceInputFails = [
    { name: product_name, price: -1, stock: product_stock, CategoryId: 1 }, // 400 - price should not be in negative numbers!
    { name: product_name, price: null, stock: product_stock, CategoryId: 1 }, // 400 - price should not be empty!
    { name: product_name, price: 'product_price', stock: product_stock, CategoryId: 1 }, // 400 - price should be a number!
]

const stockInputFails = [
    { name: product_name, stock: -1, price: product_price, CategoryId: 1 }, // 400 - stock should not be in negative numbers!
    { name: product_name, stock: null, price: product_price, CategoryId: 1 }, // 400 - stock should not be empty!
    { name: product_name, stock: 'product_stock', price: product_price, CategoryId: 1 }, // 400 - stock should be a number!
]

// defining error message(s)

// creates needed data and record(s) BEFORE the test begins
beforeAll(done => {
    Category.create({ name: "RGB Strips", description: "All things RGB strips!" })
        .then(() => Product.create({ name: 'RGB Strip Lights', price: 16.88, stock: 40, CategoryId: 1 }))
        .then(() => User.create(data))
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
    queryInterface.bulkDelete('Products')
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
        desc: 'POST /products',
        tests: [
            {
                it: 'should successfully post a new product',
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
        desc: 'GET /products',
        tests: [
            {
                it: 'should successfully list products',
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
        desc: 'GET /products/:id',
        tests: [
            {
                it: 'should successfully get details from a product',
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
        desc: 'PUT /products',
        tests: [
            {
                it: 'should successfully update a product',
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
        desc: 'DELETE /products',
        tests: [
            {
                it: 'should successfully delete a product',
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
                it: 'should throw HTTP 400 error if CategoryId is absent',
                hookURL: hook('post')(URL),
                headers,
                payload: noCategoryIdInputFails, // payload in array of objects
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
                it: 'should throw HTTP 400 error for any invalid inputs on name column',
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
                it: 'should throw HTTP 400 error for any invalid inputs on price column',
                hookURL: hook('post')(URL),
                headers,
                payload: priceInputFails, // payload in array of objects
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
                it: 'should throw HTTP 400 error for any invalid inputs on stock column',
                hookURL: hook('post')(URL),
                headers,
                payload: stockInputFails, // payload in array of objects
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