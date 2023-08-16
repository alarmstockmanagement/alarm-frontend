import Image from 'next/image'
import BackIcon from '../../Img/BackIcon.png'
import barcodeIcon from '../../Img/barcodeIcon.png'
import addImage from '../../Img/test.png'
import './addProduct.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AddCate from '../addCategory/addCate'
import addIcon from '../../Img/addIcon.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import categoryOpen from '../../../Atom/CategoryOpen'
import productOpen from '../../../Atom/productOpen'
import token from '../../../Atom/accessToken'
import { BaseUrl } from '@/app/layout'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading';
import Cookies from 'js-cookie'
import checkLog from '@/checkLoggin'



function AddProduct() {

    const file = useRef(null)
    const [isProductOpen, setIsProductOpen] = useRecoilState(productOpen)
    const [isAddOpen, setIsAddOpen] = useRecoilState(categoryOpen)
    const nameInp = useRef()
    const codeInp = useRef()
    const priceInp = useRef()
    const categoryInp = useRef()
    const quanInp = useRef()
    const expireInp = useRef()
    const limitInp = useRef()
    const date = new Date()
    const today = date.toLocaleDateString()
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(addImage)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    function formatDate(date = new Date()) {
        const year = date.toLocaleString('default', { year: 'numeric' });
        const month = date.toLocaleString('default', {
            month: '2-digit',
        });
        const day = date.toLocaleString('default', { day: '2-digit' });

        console.log([year, month, day].join('-'))

        return [year, month, day].join('-');
    }

    function emptyInputs() {
        nameInp.current.value = null
        codeInp.current.value = null
        priceInp.current.value = null
        categoryInp.current.value = null
        quanInp.current.value = null
        expireInp.current.value = null
        limitInp.current.value = null
        file.current.value = null
        setImage(addImage)
    }
    const tokken = useRecoilValue(token)



    const [data, setDate] = useState([])
    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/category/get/all/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = axios.request(options)
            .then(function (response) {
                setDate(response.data.data)

            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
            }
            );
    }, [isAddOpen])

    async function uploadImg() {
        let formData = new FormData()
        formData.append("name", nameInp.current.value)
        formData.append("price", priceInp.current.value)
        formData.append("category", categoryInp.current.value)
        formData.append("prodDate", formatDate(new Date()))
        formData.append("expDate", formatDate(new Date(expireInp.current.value)))
        formData.append("medicineImg", file.current.files[0] == undefined ? "" : file.current.files[0])
        formData.append("stock", quanInp.current.value)
        formData.append("stockWarnLimit", limitInp.current.value)
        formData.append("barCode", codeInp.current.value)

        console.log(formatDate(new Date(expireInp.current.value)))

        const options = {
            method: 'POST',
            url: `${BaseUrl}/medicine/create/`,
            data: formData
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                setIsLoading(false)
                toast.success(response.data.message)
                emptyInputs()
                setImage(addImage)
                setIsProductOpen(false)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                setIsLoading(false)
                toast.error(error.response.data.message)
            }
            );
    }
    return (
        <div className="addProduct  z-50 bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary h-full xl:h-fit w-[1150px] px-[50px]">
                <div className="flex justify-between">
                    <Image alt="icon" src={BackIcon} onClick={() => setIsProductOpen(false)} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                    <div className="addImage w-[390px] flex justify-center items-center flex-col">
                        <h4 className='text-[20px] mb-2'>اضافة صور المنتج</h4>
                        <div className="img relative">
                            <input type="file" onChange={(e) => {
                                onImageChange(e)
                            }} ref={file} className='absolute w-full h-full opacity-0 cursor-pointer' />
                            <Image alt='icon' src={image} width={390} height={350} ></Image>
                        </div>
                    </div>
                    <div className='form w-1/2'>
                        <div className="input py-2" dir='ltr'>
                            <label htmlFor="">كود المنتج</label>
                            <div className='relative'>
                                <Image alt='icon' src={barcodeIcon} className='absolute right-[10px] top-[50%] translate-y-[-50%]'></Image>

                                <input ref={codeInp} type="number" autoFocus />
                            </div>
                        </div>
                        <div className="input py-2  flex flex-col items-end w-full">
                            <label htmlFor="">أسم المنتج</label>
                            <input ref={nameInp} type="text" />
                        </div>
                        <div className="input py-2 flex flex-col relative items-end w-full">
                            <label htmlFor="">الفئات
                            </label>
                            <Image alt='icon' src={addIcon} onClick={() => setIsAddOpen(true)} className=' cursor-pointer absolute bottom-[25px] right-[-50px]'></Image>
                            <select ref={categoryInp}>
                                {
                                    data.map((product, index) => {
                                        return (
                                            <option key={index}> {product.name}</option>

                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="input py-2 flex flex-col items-end w-full">
                            <label htmlFor="">الكمية</label>
                            <div className="quan w-full">

                                <input ref={quanInp} type="number" />
                            </div>
                        </div>
                        <div className="input py-2 flex flex-col items-end w-full">
                            <label htmlFor="">حد المخزون</label>
                            <div className="quan w-full">
                                <i className="fa-solid fa-circle-exclamation absolute bottom-[12px] right-[-50px] cursor-pointer text-[28px] text-red">
                                    <p>سيتم تنبيهك في حال وصول المنتج لهذا الحد</p>
                                </i>
                                <input ref={limitInp} type="number" />
                            </div>
                        </div>
                        <div className="input py-2  flex flex-col items-end w-full">
                            <label htmlFor="">السعر</label>
                            <div className="price w-full">

                                <input ref={priceInp} type="number" />
                            </div>
                        </div>
                        <div className="input py-2  flex flex-col items-end w-full">
                            <label htmlFor="">تاريخ انتهاء الصلاحية</label>
                            <input ref={expireInp} type="date" />
                        </div>
                    </div>
                </div>

                <button disabled={isLoading} onClick={() => {
                    setIsLoading(true)
                    uploadImg()

                }} className={`bg-primary px-[50px] text-[#fff] w-full py-5 my-5 rounded-[10px] ${isLoading ? "cursor-not-allowed" : null}`}>
                    {
                        isLoading ?
                            <ReactLoading className="mx-auto" type="spin" width={30} height={30} /> :
                            " حفظ المنتج"
                    }

                </button>
            </div>
            {
                isAddOpen ? <AddCate title="category" /> : null
            }

        </div>
    )
}

export default AddProduct