'use client'

import Image from "next/image"
import signupIMG from '../../Img/signup.png'
import UserIcon from "../../Img/user.png"
import emailIcon from "../../Img/envelopeIcon.png"
import passIcon from "../../Img/lockIcon.png"
import { useRef } from "react"
import Layout from "../../components/layout/layout"
import token from "../../../Atom/accessToken"
import axios from "axios"
import { BaseUrl } from "../layout"
import { useRecoilValue } from "recoil"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import checkLog from "@/checkLoggin"

export default function AddUser() {


    const userNameInp = useRef(null)
    const emailInp = useRef(null)
    const passwordInp = useRef(null)
    const tokken = useRecoilValue(token)



    function clearInp() {
        userNameInp.current.value = ""
        emailInp.current.value = ""
        passwordInp.current.value = ""
    }

    async function addUser() {
        const options = {
            method: 'POST',
            url: `${BaseUrl}/auth/register-admin/`,
            data: {
                "email": emailInp.current.value,
                "fullName": userNameInp.current.value,
                "password": passwordInp.current.value
            }
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
               
                toast.success("تم انشاء صيدلي بنجاح")
                clearInp()
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                toast.error(error.response.data.message)
               
            }
            );
    }

    return (
        <Layout>
            <section className="signup bg-bgPrimary h-[calc(100vh-140px)]">
                <div className="container h-full">
                    <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-4 h-full items-center">
                        <div className="img max-[767px]:absolute max-[767px]:opacity-[0.1]">
                            <Image src={signupIMG} alt="signup image"></Image>
                        </div>
                        <div className=" w-[70%] max-[992px]:w-full mx-auto relative z-1">
                            <h1 className="text-primary text-center text-[40px] font-semibold">Alarm</h1>
                            <p className="text-center text-[40px] font-bold">مرحبا بك !</p>
                            <div className="input flex flex-col my-3">
                                <label htmlFor="UserName">اسم المستخدم</label>
                                <div className="inputBox flex bg-[#fff] items-center rounded-[10px] shadow-sm">
                                    <Image alt="icon" className="w-[20px] m-[10px] h-[20px]" src={UserIcon}></Image>
                                    <input ref={userNameInp} type="text" id="UserName" name="userName" className="rounded-[10px] p-[20px] w-full focus-visible:outline-none " placeholder="اسم المستخدم" />
                                </div>
                            </div>
                            <div className="input flex flex-col my-3">
                                <label htmlFor="Email">الايميل</label>
                                <div className="inputBox flex bg-[#fff] items-center rounded-[10px] shadow-sm">
                                    <Image alt="icon" className="w-[20px] m-[10px] h-[20px]" src={emailIcon}></Image>
                                    <input ref={emailInp} type="Email" id="Email" name="email" className=" rounded-[10px] p-[20px] w-full focus-visible:outline-none " placeholder="أدخل عنوان بريدك الالكتروني " />
                                </div>
                            </div>
                            <div className="input flex flex-col my-3">
                                <label htmlFor="password">كلمة المرور</label>
                                <div className="inputBox flex bg-[#fff] items-center rounded-[10px] shadow-sm">
                                    <Image alt="icon" className="w-[20px] m-[10px] h-[20px]" src={passIcon}></Image>
                                    <input ref={passwordInp} type="password" id="password" name="password" className="rounded-[10px] p-[20px] w-full focus-visible:outline-none " placeholder="كلمة السر" />
                                </div>
                            </div>
                            <button onClick={() => { addUser() }} className="w-full p-4 rounded-[10px] bg-primary my-5 text-[#fff] text-[22px] font-semibold">اضافة صيدلي</button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>

    )
}
