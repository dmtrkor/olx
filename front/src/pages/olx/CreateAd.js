import React from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {toast} from "react-toastify"

export default function FormLogin() {

    const formSchema = Yup.object().shape({
        title: Yup.string()
            .required("Заголовок обязателен")
            .min(5, "Минимальная длинна 5 символов"),
        massage: Yup.string()
            .required('Пароль обязательный')
            .min(5, 'Минимальная длинна 5 символов'),
        

    })

    const formOptions = {resolver: yupResolver(formSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions)
    const {errors} = formState

    const onSubmit = function (data) {

        fetch('http://localhost:3333/api' +
            '/ad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                // console.log(res)
                if (res.status !== 200) {
                    toast.error("Ошибка")
                    return null
                }
                return res.json()
            })
            .then(data => {
                if (data === null) {
                    console.log("Я ничего не делаю")
                    return
                }
                toast.success("Вы успешно вошли в систему")
                // toast.success(data.token)
                console.log(data)
                localStorage.setItem('jwtToken', data.token)
            })
            .catch(err => {
                console.log(err)
                toast.error(err)
            })

    }


    return (
        <div className="container mt-5">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Заголовок</label>
                    <input
                        name="title"
                        type="text"
                        {...register('title')}
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input
                        name="massage"
                        type="text"
                        {...register('massage')}
                        className={`form-control ${errors.massage ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.massage?.message}</div>
                </div>
                <select {...register("type")}>
                    <option value="0">Sell</option>
                    <option value="1">Buy</option>
                    <option value="2">Trade</option>
                </select>
                <select {...register("category")}>
                    <option value="0">House</option>
                    <option value="1">Tech</option>
                    <option value="2">Auto</option>
                </select>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

}