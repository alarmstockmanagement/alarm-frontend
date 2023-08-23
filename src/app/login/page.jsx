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
import { BaseUrl } from "../layout"

export default function Login() {


    const emailInp = useRef(null)
    const passwordInp = useRef(null)
    const baseUrl = "https://inventory-apis.up.railway.app/"
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    const [accessToken, setToken] = useRecoilState(token)
    const [isLoading, setIsLoading] = useState(false)
    async function login(email, pass) {


        let result = await axios.post(`${BaseUrl}/auth/login/`, {
            email: email,
            password: pass
        })
            .then(function (response) {
                Cookies.set("islogged", true, { expires: 900 })
                Cookies.set("accessToken", response.data.access, { expires: 900 })
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
                        <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" width="209" height="46" viewBox="0 0 209 46" fill="none">
                            <path d="M35.2373 13.748L47.4331 6.70628C51.9356 4.10659 57.6931 5.6491 60.2927 10.1516V10.1516C62.8924 14.6541 61.3499 20.4115 56.8475 23.0112L44.6516 30.053L35.2373 13.748Z" fill="#404BD9" />
                            <path d="M19.9826 29.1965L8.6526 22.6551C4.62833 20.3317 3.24951 15.1859 5.57293 11.1616C7.89634 7.13733 13.0422 5.75851 17.0664 8.08192L28.3964 14.6233L19.9826 29.1965Z" stroke="#43465F" stroke-width="2" />
                            <circle cx="31.1524" cy="22.2637" r="1.51959" fill="#43465F" />
                            <circle cx="27.3526" cy="26.8223" r="1.51959" fill="#43465F" />
                            <circle cx="26.5928" cy="35.1797" r="1.51959" fill="#43465F" />
                            <circle cx="28.8721" cy="42.0196" r="1.51959" fill="#43465F" />
                            <circle cx="34.1915" cy="40.5001" r="1.51959" fill="#43465F" />
                            <circle cx="36.8507" cy="35.5596" r="1.89949" fill="#43465F" />
                            <circle cx="31.5323" cy="30.2432" r="1.89949" fill="#43465F" />
                            <circle cx="37.2305" cy="26.8223" r="1.51959" fill="#43465F" />
                            <circle cx="30.7725" cy="36.3194" r="1.13969" fill="#43465F" />
                            <path d="M47.1074 7.77036C48.627 6.7573 52.578 5.26303 56.225 7.39046C53.9456 7.26385 48.9309 7.16257 47.1074 7.77036Z" fill="#F9F9F9" />
                            <path d="M91.72 38C91.3467 36.9067 90.96 35.8267 90.56 34.76C90.16 33.6933 89.7733 32.6 89.4 31.48H77.72C77.3467 32.6 76.96 33.7067 76.56 34.8C76.1867 35.8667 75.8133 36.9333 75.44 38H70.2C71.24 35.04 72.2267 32.3067 73.16 29.8C74.0933 27.2933 75 24.92 75.88 22.68C76.7867 20.44 77.68 18.3067 78.56 16.28C79.44 14.2533 80.3467 12.2533 81.28 10.28H86.04C86.9733 12.2533 87.88 14.2533 88.76 16.28C89.64 18.3067 90.52 20.44 91.4 22.68C92.3067 24.92 93.2267 27.2933 94.16 29.8C95.12 32.3067 96.12 35.04 97.16 38H91.72ZM83.56 15.64C82.9467 17.0533 82.24 18.7733 81.44 20.8C80.6667 22.8267 79.8533 25.0267 79 27.4H88.12C87.2667 25.0267 86.44 22.8133 85.64 20.76C84.84 18.7067 84.1467 17 83.56 15.64ZM118.184 33.64V38H100.664V10.28H105.704V33.64H118.184ZM141.447 38C141.073 36.9067 140.687 35.8267 140.287 34.76C139.887 33.6933 139.5 32.6 139.127 31.48H127.447C127.073 32.6 126.687 33.7067 126.287 34.8C125.913 35.8667 125.54 36.9333 125.167 38H119.927C120.967 35.04 121.953 32.3067 122.887 29.8C123.82 27.2933 124.727 24.92 125.607 22.68C126.513 20.44 127.407 18.3067 128.287 16.28C129.167 14.2533 130.073 12.2533 131.007 10.28H135.767C136.7 12.2533 137.607 14.2533 138.487 16.28C139.367 18.3067 140.247 20.44 141.127 22.68C142.033 24.92 142.953 27.2933 143.887 29.8C144.847 32.3067 145.847 35.04 146.887 38H141.447ZM133.287 15.64C132.673 17.0533 131.967 18.7733 131.167 20.8C130.393 22.8267 129.58 25.0267 128.727 27.4H137.847C136.993 25.0267 136.167 22.8133 135.367 20.76C134.567 18.7067 133.873 17 133.287 15.64ZM158.03 10C162.03 10 165.084 10.7333 167.19 12.2C169.324 13.6667 170.39 15.9067 170.39 18.92C170.39 22.68 168.537 25.2267 164.83 26.56C165.337 27.1733 165.91 27.92 166.55 28.8C167.19 29.68 167.844 30.64 168.51 31.68C169.177 32.6933 169.817 33.7467 170.43 34.84C171.044 35.9067 171.59 36.96 172.07 38H166.43C165.924 37.04 165.377 36.08 164.79 35.12C164.204 34.1333 163.604 33.1867 162.99 32.28C162.404 31.3467 161.817 30.48 161.23 29.68C160.644 28.8533 160.097 28.12 159.59 27.48C159.217 27.5067 158.897 27.52 158.63 27.52C158.364 27.52 158.11 27.52 157.87 27.52H155.43V38H150.39V10.68C151.617 10.4133 152.924 10.24 154.31 10.16C155.697 10.0533 156.937 10 158.03 10ZM158.39 14.36C157.324 14.36 156.337 14.4 155.43 14.48V23.44H157.63C158.857 23.44 159.937 23.3733 160.87 23.24C161.804 23.1067 162.577 22.8667 163.19 22.52C163.83 22.1733 164.31 21.7067 164.63 21.12C164.95 20.5333 165.11 19.7867 165.11 18.88C165.11 18.0267 164.95 17.3067 164.63 16.72C164.31 16.1333 163.844 15.6667 163.23 15.32C162.644 14.9733 161.937 14.7333 161.11 14.6C160.284 14.44 159.377 14.36 158.39 14.36ZM182.016 10.28C182.603 11.2933 183.256 12.5333 183.976 14C184.696 15.4667 185.43 17.0133 186.176 18.64C186.923 20.24 187.656 21.88 188.376 23.56C189.123 25.2133 189.803 26.7467 190.416 28.16C191.03 26.7467 191.696 25.2133 192.416 23.56C193.136 21.88 193.87 20.24 194.616 18.64C195.363 17.0133 196.096 15.4667 196.816 14C197.536 12.5333 198.19 11.2933 198.776 10.28H203.336C203.576 12.3067 203.803 14.4667 204.016 16.76C204.23 19.0267 204.416 21.36 204.576 23.76C204.763 26.1333 204.923 28.5333 205.056 30.96C205.216 33.36 205.35 35.7067 205.456 38H200.496C200.39 34.7733 200.256 31.4533 200.096 28.04C199.963 24.6267 199.75 21.32 199.456 18.12C199.163 18.7333 198.816 19.4667 198.416 20.32C198.016 21.1733 197.59 22.1067 197.136 23.12C196.683 24.1067 196.216 25.1333 195.736 26.2C195.283 27.2667 194.83 28.3067 194.376 29.32C193.95 30.3067 193.55 31.24 193.176 32.12C192.803 32.9733 192.483 33.7067 192.216 34.32H188.456C188.19 33.7067 187.87 32.96 187.496 32.08C187.123 31.2 186.71 30.2667 186.256 29.28C185.83 28.2667 185.376 27.2267 184.896 26.16C184.443 25.0933 183.99 24.0667 183.536 23.08C183.083 22.0933 182.656 21.1733 182.256 20.32C181.856 19.44 181.51 18.7067 181.216 18.12C180.923 21.32 180.696 24.6267 180.536 28.04C180.403 31.4533 180.283 34.7733 180.176 38H175.216C175.323 35.7067 175.443 33.3333 175.576 30.88C175.736 28.4267 175.896 26 176.056 23.6C176.243 21.1733 176.443 18.8267 176.656 16.56C176.87 14.2933 177.096 12.2 177.336 10.28H182.016Z" fill="#404BD9" />
                        </svg>
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
