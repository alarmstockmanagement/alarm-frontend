import Image from 'next/image'
import BackIcon from '../../Img/BackIcon.png'
import { useRef, useState } from 'react';
import axios from 'axios';
import categoryOpen from '../../../Atom/CategoryOpen';
import { useRecoilState, useRecoilValue } from 'recoil';
import token from '../../../Atom/accessToken';
import { BaseUrl } from '@/app/layout';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import checkLog from '@/checkLoggin';

function AddCate(props) {


    const inputCate = useRef()
    const [isAddOpen, setIsAddOpen] = useRecoilState(categoryOpen)
    const tokken = useRecoilValue(token)


    async function uploadImg() {

        let addUrl
        if (props.title == "category") {
            addUrl = `${BaseUrl}/category/create/`
        } else {
            addUrl = `${BaseUrl}/disease/create/`

        }

        const options = {
            method: 'POST',
            url: addUrl,
            data:
            {
                "name": inputCate.current.value
            },
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                toast.success(response.data.message)
                setIsAddOpen(false)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                toast.error(error.response.data.message)
            }
            )
    }


    return (
        <div className="addProduct bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary w-[570px] px-[50px]">


                <Image alt='icon' src={BackIcon} onClick={() => setIsAddOpen(false)} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className='form'>
                    <div className="input py-5" dir='ltr'>
                        <label htmlFor="">
                            {
                                props.title == "category" ? " اضافة فئة جديدة" : "اضافة مرض جديدة"

                            }
                        </label>
                        <input ref={inputCate} type="text" />
                    </div>
                </div>

                <button onClick={() => uploadImg()} className='bg-primary px-[50px] text-[#fff] w-full py-5 my-5 rounded-[10px]'> إضافة  </button>
            </div>
        </div>
    )
}
export default AddCate
