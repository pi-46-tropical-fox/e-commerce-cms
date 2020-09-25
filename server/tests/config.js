const userCredentials = { email : 'hal@g.com', password : 'password' }
const customerCredentials = { email : 'orangbiasa@mail.com', password : 'password'}
const userData = { ...userCredentials, role : 'admin', name : 'Regan Iwadha' }
const customerData = { ...customerCredentials, role : 'customer', name : 'Bukan Regan Iwadha' }

module.exports = { userCredentials, userData, customerData }
