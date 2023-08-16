'use client'
import './createSale.css'
import barcodeIcon from '../../Img/barcodeIcon.png'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import BackIcon from '../../Img/BackIcon.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import createOpen from '../../../Atom/CreateOpen'
import confirmOpen from '../../../Atom/ConfirmOpen'
import { BaseUrl } from '@/app/layout'
import axios from 'axios'
import token from '../../../Atom/accessToken'
import deleteIcon from '../../Img/deleteIcon.png'
import ConfirmSale from '../confirmSale/confirmSale'
import { ToastContainer, toast } from 'react-toastify'
import confirmMed from '../../../Atom/confirmMed'
import Warning from '../Warning/Warning'
import Cookies from 'js-cookie'
import checkLog from '@/checkLoggin'

function CreateSale() {
    const [isCreateOpen, setIsCreateOpen] = useRecoilState(createOpen)
    const [isConfirmOpen, setIsConfirmOpen] = useRecoilState(confirmOpen)
    const [list, setList] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)
    const [saleList, setSaleList] = useState([])
    const [diseases, setDiseases] = useState([])
    const tokken = useRecoilValue(token)
    const quantityInp = useRef()
    const diseaseInp = useRef()
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleString()
    const [isOpenMed, setIsOpenMed] = useRecoilState(confirmMed)
    const [errorMessage, setErrorMessage] = useState("")


    function sendConfirm(confirm) {
        if (confirm == true) {
            setSaleList((old) => [
                ...old, {
                    "id": currentProduct.id,
                    "quantity": +quantityInp.current.value
                }
            ])
            setList((old) => [
                ...old, currentProduct
            ])
            setCurrentProduct(null)
        }
    }

    async function getProduct(id) {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get-barcode/${id}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                toast.success("تم البحث عن الدواء")
                setCurrentProduct(response.data.data)
                quantityInp.current.value = 1
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                toast.error("لا يوجد منتج لهذا الكود")
            }
            );
    }

    async function checkMed(id) {
        const options = {
            method: 'POST',
            url: `${BaseUrl}/solds/check-medicine/`,
            data: {
                "disease": diseaseInp.current.value,
                "medicineId": +id
            }
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then((response) => {
                setSaleList((old) => [
                    ...old, {
                        "id": currentProduct.id,
                        "quantity": +quantityInp.current.value
                    }
                ])
                setList((old) => [
                    ...old, currentProduct
                ])
                setCurrentProduct(null)
                toast.success(response.data.message)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                if (error.response.data.message == "لا يوجد لائحة حذر لهذا المرض") {
                    toast.success("هذا الدواء مسموح به للمريض")
                    setSaleList((old) => [
                        ...old, {
                            "id": currentProduct.id,
                            "quantity": +quantityInp.current.value
                        }
                    ])
                    setList((old) => [
                        ...old, currentProduct
                    ])
                    setCurrentProduct(null)

                } else {
                    setIsOpenMed(true)
                    setErrorMessage(error.response.data.message)
                    toast.error(error.response.data.message)
                }
            }
            );
    }

    async function getDeas() {

        const options = {
            method: 'GET',
            url: `${BaseUrl}/disease/get/all/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = axios.request(options)
            .then(function (response) {
                setDiseases(response.data.data)

            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }

            }
            );
    }

    function removeItemAtIndex(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }

    useEffect(() => {
        getDeas()
    }, [])

    return (

        <div className="createSale z-10 bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary w-[1150px] ">
                <Image alt='icon' onClick={() => setIsCreateOpen(false)} src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className=' form px-[50px]'>
                    <div className=" flex gap-5 mb-5">
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">المرض
                            </label>
                            <select ref={diseaseInp}>
                                {
                                    diseases?.map((disease, index) => {
                                        return (

                                            <option key={index}>{disease.name}</option>
                                        )

                                    })
                                }
                            </select>
                        </div>
                        <div className="input relative w-full text-left">
                            <label htmlFor="">كود المنتج</label>
                            <input type="text" className='h-[62px]' autoFocus onKeyDown={(e) => {

                                if (e.code == "Enter" || e.code == "NumpadEnter") {

                                    getProduct(e.target.value)
                                }
                            }} />
                            <Image alt='icon' src={barcodeIcon} className='absolute right-[10px] top-[50%] translate-y-[10%]'></Image>
                        </div>
                    </div>

                </div>
                {
                    currentProduct == null ? null :
                        <div className="showData my-5 flex gap-5 justify-between bg-[#EAEAEA] px-[50px] py-3">
                            <div className="details flex gap-5">
                                <div className="img h-[168px] w-[187px] ">
                                    <Image alt='test-Img' src={`${BaseUrl}${currentProduct.medicine_img}`} width={187} height={"168"}></Image>

                                </div>
                                <ul className='flex flex-col justify-between'>
                                    <li>{currentProduct.name}</li>
                                    <li>كود المنتج : {currentProduct.bar_code}  </li>
                                    <li>السعر : {currentProduct.price} $</li>
                                    <li className='flex items-center '>الكمية
                                        <div className="counter relative w-[130px] ms-4">
                                            <input ref={quantityInp} type="number" className='text-center h-full w-full bg-secondary text-[#fff] p-[2px] rounded focus-visible:outline-none' defaultValue="1" min="1" />
                                            <button className='absolute left-0 bg-[#fff] w-[34px] h-[34px] text-center rounded shadow-lg' onClick={() => quantityInp.current.value = +quantityInp.current.value + 1}>+</button>
                                            <button className='absolute right-0 bg-[#fff] w-[34px] h-[34px] text-center rounded shadow-lg' onClick={() => quantityInp.current.value > 1 ? quantityInp.current.value -= 1 : null}>-</button>
                                        </div>
                                    </li>
                                    <li>تاريخ انتهاء الصلاحية : 15/12/2023</li>
                                </ul>
                            </div>
                            <div className="options flex gap-3 items-end">
                                <button className='py-3 px-16 h-fit rounded-xl bg-[#404BD9] text-[#fff]' onClick={() => {
                                    checkMed(currentProduct.id)
                                }
                                }>إضافة</button>
                                <button className='py-3 px-16 h-fit rounded-xl bg-[#D94040] text-[#fff]' onClick={() => setCurrentProduct(null)}>حذف</button>
                            </div>
                        </div>
                }
                <div className="billDetails my-5 px-[50px]">
                    {list.length > 0 ?
                        <table className="salesTable border w-full bg-[#373854] ">
                            <thead>
                                <tr>

                                    <th></th>
                                    <th>تاريخ المبيعة</th>
                                    <th>وقت المبيعة </th>
                                    <th>سعر المنتج</th>
                                    <th>الكمية</th>
                                    <th>المنتج</th>
                                    <th>كود المنتج</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    list?.map((product, index) => {
                                        return (<tr key={index}>
                                            <td>
                                                <Image src={deleteIcon} alt='icon' className='cursor-pointer' onClick={() => {
                                                    const newList = removeItemAtIndex(list, index);
                                                    const newSaleList = removeItemAtIndex(saleList, index);

                                                    setList(newList);
                                                    setSaleList(newSaleList)
                                                }}></Image>
                                            </td>
                                            <td>
                                                {date.split("/").reverse().join("-")}
                                            </td>
                                            <td>
                                                {time.split(",")[1]}
                                            </td>
                                            <td>
                                                {product.price} $
                                            </td>
                                            <td>
                                                {saleList[index].quantity} units
                                            </td>
                                            <td>
                                                {product.name}
                                            </td>
                                            <td>{product.bar_code}</td>
                                        </tr>)
                                    })
                                }

                            </tbody>
                        </table>
                        : null
                    }

                    <button onClick={() => {
                        if (saleList.length < 1) {
                            toast.error("من فضلك ادخل الدواء")
                        } else {

                            setIsConfirmOpen(true)
                        }
                    }} className='bg-primary text-[#fff] w-full py-5 my-5 rounded-[10px]'>أنشاء مبيعة</button>
                </div>
            </div>
            {
                isOpenMed ? <Warning title={errorMessage} sendConfirm={sendConfirm} /> : null
            }
            {
                isConfirmOpen ? <ConfirmSale list={list} saleList={saleList} disease={diseaseInp.current.value} /> : null
            }
        </div >
    )

}

export default CreateSale