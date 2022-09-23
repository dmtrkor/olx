// Подключение модуля работы с базой
const mongoose = require("mongoose");

// Настройка полей (схемы)
const adSchema = new mongoose.Schema({
    // _id - сделает база данных
    author_id: {type: mongoose.ObjectId}, // Кто создал // ?? String
    created_at: Date, // Когда создано
    title: String,
    message: String, // Текст объявления
    type: Number, // Тип 0 - куплю, 1 - продам, 2 поменяю ...
    price: Number, // Цена вопроса
    city: String, // Город .. country_id, city_id,
    location: String, // Адрес .. area_id, street_id
    imgMain: String, // Ссылка на главное изображение
    images: [String], // Набор дополнительных изображений
    isOpen: Boolean, // Актуально ли объявление
    category: Number // Код категории - 0- недвижимость, 1- быт техника, 3- авто ...
});

module.exports = mongoose.model("ads", adSchema);