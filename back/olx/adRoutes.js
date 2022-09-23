let express = require('express')
let router = express.Router()

let adController = require('./AdController')

router.get('/', adController.index)
router.get('/:ad_id', adController.show)

router.post('/', adController.create)

module.exports = router