const userModel = require('./models/User')
const bcrypt = require("bcrypt");
let salt = process.env.BCRYPT_SALT

/**
 * Получение текущего пользователя
 * @param request
 * @param response
 * @returns {*}
 */
exports.getMe = function (request, response) {

    // Если пользователь не авторизован - нет ключа
    if(!request.user) {
        return response.status(403).json({message: "Вы не вошли в систему"})
    }

    userModel.findById(request.user._id, function(err, user){

        if(err) {
            console.log(err);
            return response.status(404).json(err);
        }
        else {
            user['password'] = null
            // delete user.password

            return response.status(200).json(user);
        }
    });
}

/**
 * Сохранить мой профиль
 */
exports.setMe = function (request, response) {
    console.log("Обновляю пользователя")
    console.log(request.user)

    console.log("На что я его собираюсь обновить")
    let updateUser = request.body
    console.log(updateUser)

    // 1 Нужно проверить - а соответствует ли пользователь паролю
    // если не соответствует - нужно вернуть ошибку и дальше не двигаться

    // Шифрую введенный пароль
    bcrypt.hash(updateUser.password, salt, function (err, result) {
        if (err) {
            console.log(err)
            return response.status(422).json(err)
        }
        updateUser.password = result

        // Проверяю - а соответствует ли введенный пароль тому, кто воешл в систему
        userModel.findOne ({id: request.user._id, password: updateUser.password},
            async function (err, dbUser) {
                // Если ошибка - вернуть ошибку
                if (err) {
                    console.log(err)
                    return response.status(422).json(err)
                }
                // Если в базе не найдено вернуть 403
                if(dbUser=== null) {
                    return response.status(403).json('{"err":"Auth"}')
                }

                console.log("А где пользовательский аватар")
                if(request.files) {
                    // 2 сохранить в папочку, где у меня будут лежать аватары
                    let avatarFile = request.files.avatar
                    let avatarDir = './public/store/avatars/' + request.user._id + '.jpg' //+ avatarFile.name
                    await avatarFile.mv(avatarDir) // переместить файл
                    updateUser.avatar = '/store/avatars/' + request.user._id + '.jpg' //+ avatarFile.name
                }

                // 3 обновить данные в базе данных
                updateUser.role = request.user.role // Роль оставить старую
                updateUser.email = request.user.email

                // 4 обновляю запись в базе данных
                userModel.findByIdAndUpdate(request.user._id, updateUser, function (err, newUser) {
                    if(err) {
                        console.log(err);
                        return response.status(422).json(err);
                    }
                    else {
                        // Если все шаги ОК - отсылаю код 204 - данные обновлены
                        return response.sendStatus(204);
                    }
                })

            })



    })


}