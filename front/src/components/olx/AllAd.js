import CreateAd from "./CreateAd";
import "./olxStyles.css"
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function AllAd() {

    const [ads, setAd] = useState([])

    const loadAd = function () {
        fetch('http://localhost:3333/api' + '/ad', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('jwtToken')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
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
                toast.success("Вы успешно получили объявления")
                console.log(data)
                setAd(data)
            })
            .catch(err => {
                console.log(err)
                toast.error(err)
            })
    }

    useEffect(() => {
        loadAd()
    }, [])


    return (
        <>
            <ul>
                {ads.map(ad => (
                    <li>
                        <h1>{ad.title}</h1>
                        <p>{ad.message}</p>
                        <p>Цена {ad.price}$</p>
                        <p>Город {ad.city}</p>
                        <p>Район {ad.location}</p>
                    </li>
                ))

                }
            </ul>
        </>
    )
}