import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";


export default function CreateAd(){

    /**
     * Если в хранилище нет ключа - перейти на страницу логина
     */
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('jwtToken') === null) {
            return navigate("/login");
        }
    },[]);



    const formSchema = Yup.object().shape({
        title: Yup.string()
            .required("Заголовок обязательный")
            .min(5, "Минимальная длинна заголовка 5 символов"),
        message: Yup.string()
            .required("Текст объявления обязательный")
            .min(5, "Минимальная длинна 5 символов"),
        price: Yup.number()
            .required("Обязательно укажите стоимость"),
        city: Yup.string()
            .required("Город обязательный"),
        location: Yup.string()
            .required("Район обязательный"),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = function (data) {

        fetch('http://localhost:3333/api' + '/ad',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('jwtToken')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                // console.log(res)
                if(res.status !==201) {
                    toast.error("Ошибка")
                    return null
                }
                return res.json()
            })
            .then(data => {
                if(data === null) {
                    console.log("Я ничего не делаю")
                    return
                }
                toast.success("Вы успешно создали объявление")
                // toast.success(data.token)
                console.log(data)
            })
            .catch(err=> {
                console.log(err)
                toast.error(err)
            })

    }




    return (
        <div className="container mt-5">
            <h2>Создать объявление</h2>
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
                    <label>Текст объявления</label>
                    <textarea
                        name="message"

                        {...register('message')}
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    />

                    <div className="invalid-feedback">{errors.message?.message}</div>
                </div>
                <div className="form-group">
                    <label>Тип объявления</label>
                    <select {...register("type")}>
                        <option value="0">Куплю</option>
                        <option value="1" selected={true}>Продам</option>
                        <option value="2">Обменяю</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Цена</label>
                    <input
                        name="price"
                        type="number"
                        {...register('price')}
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
                <div className="form-group">
                    <label>Город</label>
                    <input
                        name="city"
                        type="text"
                        {...register('city')}
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.city?.message}</div>
                </div>
                <div className="form-group">
                    <label>Район</label>
                    <input
                        name="location"
                        type="text"
                        {...register('location')}
                        className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.location?.message}</div>
                </div>
                <div className="form-group">
                    <label>Категория объявления</label>
                    <select {...register("category")}>
                        <option value="0">недвижимость</option>
                        <option value="1" selected={true}>техника</option>
                        <option value="2">авто</option>
                    </select>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}