'use strict'

const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const controllers = {}

fs
    // read the whole file contents inside current dir
    .readdirSync(__dirname)
    // filters out index.js and other non-JS files
    .filter(file => (file.indexOf !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    // then adds filtered list to the controllers object
    .forEach(file => {
        const controller = require(path.join(__dirname, file))
        controllers[controller.name] = controller
    })

// exports the controllers
module.exports = controllers
