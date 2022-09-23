// Чтение данных из файла .env
require('dotenv').config();

// Сам веб сервер (приложение)
let express = require('express');
let app = express();

// Для технических сообщений
let logger = require('morgan');
app.use(logger('dev'));

// Для разрешения получать запросы с любого места
let cors = require('cors')
app.use(cors())

// Для работы JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Для работы с файлами
let fileupload = require ("express-fileupload");
app.use(
    fileupload({
        createParentPath: true,
    }),
);

// Для работы с куками
let cookieParser = require('cookie-parser');
app.use(cookieParser());

// Для статических файлов
let path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Для работы с базой данных
require("./config/mongo").connect();

// Проверять всех входящих на ключ
const authMiddleware = require('./auth/authMiddleware')
app.use(authMiddleware)

// Подключение маршрутов
const auth = require('./auth/authRoutes')
app.use('/api/auth', auth)

const ad = require('./olx/adRoutes')
app.use('/api/ad', ad)



module.exports = app;
