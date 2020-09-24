const { History } = require('../models')

class HistoryController {
    static show (req, res, next) {
        const UserId = req.userData.id
        History.findAll({
            where: {UserId},
            include: ['Product']
        })
            .then(history => {
                return res.status(200).json(history)
            })
            .catch( err => {
                return next(err)
            })
    }

    static addHistory (req, res, next) {
        const UserId = req.userData.id

        const dataHistory = {
            invoice: req.body.invoice,
            UserId: req.body.UserId,
            ProductId: req.body.ProductId,
            status: req.body.status,
            quantity: req.body.quantity
        }

        History.create(dataHistory)
            .then( history => {
                return res.status(201).json(history)
            })
            .catch( err => {
                return next(err)
            })
    }

}

module.exports = HistoryController