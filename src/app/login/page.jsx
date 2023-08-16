'use client'

import Image from "next/image"
import loginIMG from '../../Img/login.png'
import emailIcon from "../../Img/envelopeIcon.png"
import passIcon from "../../Img/lockIcon.png"
import { useRef, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import token from "../../../Atom/accessToken"
import { useRecoilState } from "recoil"
import WrongMessage from "../../components/wrongMessage/wrongMessage"
import ReactLoading from 'react-loading';

export default function Login() {


    const emailInp = useRef(null)
    const passwordInp = useRef(null)
    const baseUrl = "https://inventory-apis.up.railway.app/"
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    const [accessToken, setToken] = useRecoilState(token)
    const [isLoading, setIsLoading] = useState(false)
    async function login(email, pass) {
    

        let result = await axios.post('https://inventory-apis.up.railway.app/auth/login/', {
            email: email,
            password: pass
        })
            .then(function (response) {
                Cookies.set("islogged", true, { expires: 900 })
                Cookies.set("accessToken", response.data.access, { expires: 900})
                Cookies.set("refreshToken", response.data.refresh, { expires: 900 })
                setToken(response.data.access)
                window.location.reload()
            })
            .catch(function (error) {
                
                setIsLoading(false)
                setError(true)
                setMessage(error.response.data.message)
            });

    }

    function HandleInput() {
        if (emailInp.current.value != "" || passwordInp.current.value != "" || !emailInp.current.value.includes("@")) {

            login(emailInp.current.value, passwordInp.current.value)
        }
    }

    return (
        <section className="signup bg-bgPrimary h-[calc(100vh-50px)]">
            <div className="container h-full">
                <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-4 h-full items-center">
                    <div className=" w-[70%] z-50 max-[992px]:w-full mx-auto relative z-1">
                        <h1 className="text-primary text-center text-[40px] font-semibold">Alarm</h1>
                        <p className="text-center text-[40px] font-bold">مرحبا بعودتك</p>
                        <div className="input flex flex-col my-3">

                            {
                                error ? <WrongMessage title={message} /> : null
                            }

                            <label htmlFor="Email">الايميل</label>
                            <div className="inputBox flex bg-[#fff] items-center rounded-[10px]">
                                <Image alt="icon" className="w-[20px] m-[10px] h-[20px]" src={emailIcon}></Image>
                                <input ref={emailInp} type="Email" id="Email" name="email" className="rounded-[10px] p-[20px] w-full focus-visible:outline-none " placeholder="أدخل عنوان بريدك الالكتروني " />
                            </div>
                        </div>
                        <div className="input flex flex-col my-3">
                            <label htmlFor="password">كلمة المرور</label>
                            <div className="inputBox flex bg-[#fff] items-center rounded-[10px]">
                                <Image alt="icon" className="w-[20px] m-[10px] h-[20px]" src={passIcon}></Image>
                                <input ref={passwordInp} type="password" id="password" name="password" className="rounded-[10px] p-[20px] w-full focus-visible:outline-none " placeholder="كلمة السر" />
                            </div>
                        </div>
                        <button onClick={() => {
                            setIsLoading(true)
                            HandleInput()
                        }} className={`w-full ${isLoading ? "cursor-not-allowed" : null} p-4 rounded-[10px] bg-primary my-5 text-[#fff] text-[22px] font-semibold`}
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                    <ReactLoading className="mx-auto" type="spin" width={30} height={30} />
                                    :
                                    "تسجيل الدخول"

                            }


                        </button>
                     </div>
                    <div className="img max-[767px]:absolute max-[767px]:opacity-[0.1]">
                        <Image src={loginIMG} alt="signup image"></Image>
                    </div>
                </div>
            </div>
        </section>
    )
}
