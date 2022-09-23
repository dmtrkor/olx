// Методы для прокладки дороги
let express = require('express');
let router = express.Router();

// Ссылка на того - к кому я прокладываю дорогу
let authController = require('./AuthController')
let userController = require('./UserController')

// Правила - как отвечать тому, кто пришел
router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/getMe', userController.getMe )
router.post('/setMe', userController.setMe )

// Подготовится к подключению к общей сети дорог
module.exports = router;