'use client'

import { useEffect, useRef, useState } from "react"
import Layout from "../../components/layout/layout"
import testImg from '../../Img/test.png'
import Image from "next/image"
import AddBlockProduct from "../../components/addBlockProduct/addBlockProduct"
import { useRecoilState, useRecoilValue } from "recoil"
import addBlockOpen from "../../../Atom/addBlockOpen"
import addIcon from '../../Img/addIcon.png'
import { BaseUrl } from "../layout"
import token from "../../../Atom/accessToken"
import axios from "axios"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import checkLog from "@/checkLoggin"


export default function Block() {


    const [currentPage, setCureentPage] = useState(true)
    const [addOpen, setAddOpen] = useRecoilState(addBlockOpen)
    const [listDisease, setListDisease] = useState([])
    const [date, setDate] = useState([])
    const tokken = useRecoilValue(token)
    const test = useRef()
    const [selected, setSelected] = useState(0)

    async function getData(id) {
        setSelected(id)
        let url
        if (currentPage == true) {
            url = `${BaseUrl}/banlist/get/${id}/`
        }
        if (currentPage == false) {
            url = `${BaseUrl}/dangerlist/get/${id}/`
        }
        const options = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },
        }
        let result = axios.request(options)
            .then(function (response) {
                toast.success("تم العثور علي لائحة لهذا المرض")
                setDate(response.data.data.medicine)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                toast.error(error.response.data.message)
                setDate([])
            }
            );
    }


    useEffect(() => {
        let url
        if (currentPage == true) {
            url = `${BaseUrl}/disease/get/all/`
        }
        if (currentPage == false) {
            url = `${BaseUrl}/category/get/all/`

        }
        const options = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = axios.request(options)
            .then(function (response) {
                setListDisease(response.data.data)
                if(selected === 0 ) {
                    getData(response.data.data[0].id)
                }
                if (selected > 0) {
                    getData(selected)
                }
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }

            }
            );
            
    }, [currentPage, addOpen])


    return (
        <Layout>
            <ul className="flex gap-5">
                <li onClick={() => {
                    setSelected(0)
                    setCureentPage(true) }} className={`cursor-pointer text-[20px] font-semibold ${currentPage ? "text-vilot border-b-2" : ""} `}>قائمة الامراض </li>
                <li onClick={() => { 
                    setSelected(0)
                    setCureentPage(false) }} className={`cursor-pointer text-[20px] font-semibold ${currentPage ? "" : "text-vilot border-b-2"} `}>قائمة محظورات اللوائح الطبية</li>
            </ul>
            <div className="tableDetails bg-bgPrimary pt-5 mt-5 rounded-xl text-[20px] text-[#fff]" >

                <div className="input mx-10 mb-10 relative text-[#000] flex flex-col items-end ms-auto w-fit">
                    <label htmlFor="">{
                        currentPage ? "المرض" : "الفئة"
                    }
                    </label>
                    <Image src={addIcon} onClick={() => setAddOpen(true)} className=' cursor-pointer absolute bottom-[10px] right-[-50px]'></Image>
                    <select onChange={() => {
                        setSelected(test.current.value)
                        getData(test.current.value)
                    }} dir="ltr" ref={test} className="p-4 w-[490px] shadow-sm rounded-md">
                        {
                            listDisease?.map((dis, index) => {
                                return (
                                    <option key={index} value={dis.id}>{dis.name}</option>
                                )
                            })
                        }
                    </select>

                </div>
                <div className="products max-h-[calc(100vh-368px)] overflow-auto bg-[#373854] flex flex-wrap rounded-3xl p-10 gap-10 justify-between">
                    {
                        date?.length > 0 ?
                            date?.map((product, index) => {

                                return (
                                    <>
                                        <div key={index} className="product bg-[#282945] rounded-xl flex gap-5 items-center w-full p-3 2xl:w-[48%]">
                                            <Image src={`${BaseUrl}${product.medicine_img}`} alt="medicine image" width={142} height={148}></Image>
                                            <div className="details">
                                                <ul>
                                                    <li>{product.name}</li>
                                                    <li>كود المنتج : {product.bar_code}  </li>
                                                    <li>السعر : {product.price} $</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>

                                )
                            })
                            : <p className="text-[30px]">لا يوجد قائمة</p>
                    }

                </div>
                {
                    addOpen ? <AddBlockProduct current={currentPage} currentValue={test.current.value} /> : null
                }

            </div>
        </Layout>
    )
}
