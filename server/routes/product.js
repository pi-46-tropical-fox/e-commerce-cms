const router = require(`express`).Router()
const ProductController = require(`../controllers/ProductController`)

router.get(`/`, ProductController.read)
router.post(`/`, ProductController.add)
router.get(`/:id`, ProductController.find)
router.put(`/:id`, ProductController.edit)
router.delete(`/:id`, ProductController.delete)


module.exports = router