// Подключение модуля работы с базой
const mongoose = require("mongoose");

// Настройка полей (схемы)
const contactSchema = new mongoose.Schema({

    email: { type: String, unique: true },
    key: { type: String, unique: true },
    sendToUser: String

// Относится к профилю пользователя:
//     name: String,
//     phone: String,
//     message: String,
//     created_at: Date,
//     sendToMe: String,
//     sendToUser: String
});

module.exports = mongoose.model("emailConfirmations", contactSchema);