'use client'
import './addBlockProduct.css'
import barcodeIcon from '../../Img/barcodeIcon.png'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import BackIcon from '../../Img/BackIcon.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import addIcon from '../../Img/addIcon.png'
import categoryOpen from '../../../Atom/CategoryOpen'
import AddCate from '../addCategory/addCate'
import addBlockOpen from '../../../Atom/addBlockOpen'
import axios from 'axios'
import { BaseUrl } from '@/app/layout'
import token from '../../../Atom/accessToken'
import deleteIcon from '../../Img/deleteIcon.png'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import checkLog from '@/checkLoggin'


function AddBlockProduct(props) {
    const [isAddOpen, setIsAddOpen] = useRecoilState(categoryOpen)
    const [addOpenBlock, setAddOpenBlock] = useRecoilState(addBlockOpen)
    const productCode = useRef()
    const [blockArray, setBlockArray] = useState([])
    const [addBlockArray, setAddBlockArray] = useState([])
    const tokken = useRecoilValue(token)
    const [listDisease, setListDisease] = useState([])
    const cateInput = useRef()
    const [oldList, setOldList] = useState([])


    async function getData(id) {

        let url
        if (props.current == true) {
            url = `${BaseUrl}/banlist/get/${id}/`
        }
        if (props.current == false) {
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
                setOldList(response.data.data.medicine)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                setOldList([])
            }
            );
    }

    function checkMedInOldList() {
        let check = false
        oldList.map((product) => {
            if (productCode.current.value == product.bar_code) {
                check = true
            }
        })
        if (check) {
            toast.error("هذا الدواء موجود بالفعل في هذه القائمة")

        } else {
            getProduct()
        }

    }

    async function getProduct() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get-barcode/${productCode.current.value}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                setAddBlockArray((old) => [
                    ...old,
                    ...oldList, {
                        "id": response.data.data.id,
                        "barcode": response.data.data.bar_code
                    }
                ])
                setBlockArray((old) => [
                    ...old,
                    response.data.data
                ])
                toast.success("تم العثور علي الدواء")
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }

                toast.error(error.response.data.message)
            }
            );
    }

    async function addList() {

        console.log(addBlockArray)

        let url
        let data
        if (props.current == true) {
            url = `${BaseUrl}/banlist/create/`
            data = {
                "disease": JSON.parse(cateInput.current.value).name,
                "medicines": addBlockArray
            }
        }
        if (props.current == false) {
            url = `${BaseUrl}/dangerlist/create/`
            data = {
                "category": JSON.parse(cateInput.current.value).name,
                "medicines": addBlockArray
            }
        }
        const options = {
            method: 'POST',
            url: url,
            data: data
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {

                toast.success(response.data.message)
                setAddOpenBlock(false)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                if (error.response.data.message == "يوجد بالفعل قائمة حظر لهذا المرض" ||
                    error.response.data.message == "يوجد بالفعل قائمة حظر لهذه الفئة"
                ) {
                    updateList()
                }
                console.log(error)
            }
            );
    }

    async function updateList() {
        let url
        let data
        console.log(addBlockArray)
        if (props.current == true) {
            url = `${BaseUrl}/banlist/update/${JSON.parse(cateInput.current.value).id}/`
            data = {
                "disease": JSON.parse(cateInput.current.value).name,
                "medicines": addBlockArray
            }
        }
        if (props.current == false) {
            url = `${BaseUrl}/dangerlist/update/${JSON.parse(cateInput.current.value).id}/`
            data = {
                "category": JSON.parse(cateInput.current.value).name,
                "medicines": addBlockArray
            }
        }
        const options = {
            method: 'PUT',
            url: url,
            data: data
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                toast.success(response.data.message)
                setAddOpenBlock(false)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                console.log(error)
            }
            );
    }

    function removeItemAtIndex(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }


    useEffect(() => {
        getData(props.currentValue)
        let url
        if (props.current == true) {
            url = `${BaseUrl}/disease/get/all/`
        }
        if (props.current == false) {
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
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
                toast.error(error.response.data.message)
            }
            );
    }, [isAddOpen])

    return (

        <div className="createSale text-[#000] bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary w-[1150px] ">
                <Image alt='icon' onClick={() => setAddOpenBlock(false)} src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className='form px-[50px]'>
                    <div className=" flex gap-5 mb-5">
                        <div className="input relative flex flex-col w-1/2 items-end ms-auto">
                            <Image alt='icon' src={addIcon} onClick={() => setIsAddOpen(true)} className=' cursor-pointer absolute bottom-[10px] right-[-50px]'></Image>
                            <label htmlFor="">
                                {
                                    props.current ? "المرض" : "الفئة"
                                }

                            </label>
                            <select ref={cateInput} onChange={(e) => {
                                getData(JSON.parse(cateInput.current.value).id)
                            }}>
                                {
                                    listDisease.map((dise, index) => {

                                        return (
                                            <option key={index} value={JSON.stringify(dise)} selected={props.currentValue == dise.id ? true : false}>{dise.name} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-5 items-end">

                        <button onClick={() => { checkMedInOldList() }} className='bg-primary text-[#fff] w-[240px]  py-4 rounded-[10px]'> أضف الدواء</button>
                        <div className="input relative text-end flex-1">
                            <label htmlFor="">اضافة دواء جديد</label>
                            <input type="number" ref={productCode} />
                            <Image alt='icon' src={barcodeIcon} className='absolute right-[10px] top-[50%] translate-y-[10%]'></Image>

                        </div>
                    </div>
                </div>

                <div className="billDetails my-5 px-[50px]">
                    <table className="salesTable text-[16px] border w-full bg-[#373854] ">
                        <thead>
                            <th></th>
                            <th>سعر المنتج</th>
                            <th> الكمية</th>
                            <th> اسم المنتج</th>
                            <th>كود المنتج</th>
                        </thead>
                        <tbody className="text-center">
                            {
                                blockArray.map((product, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Image src={deleteIcon} alt='icon' className='cursor-pointer' onClick={() => {
                                                    const newList = removeItemAtIndex(blockArray, index);
                                                    const newSaleList = removeItemAtIndex(addBlockArray, index);

                                                    setBlockArray(newList);
                                                    setAddBlockArray(newSaleList)
                                                }}></Image>
                                            </td>
                                            <td>
                                                {product.price} $
                                            </td>
                                            <td>
                                                {product.stock} units
                                            </td>
                                            <td>
                                                {product.name}
                                            </td>
                                            <td>{product.bar_code}</td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                    <button onClick={() => addList()} className='bg-primary text-[#fff] w-full py-5 my-5 rounded-[10px]'> إضافة  </button>
                </div>
            </div>
            {
                isAddOpen ? <AddCate title={props.current ? "" : "category"} /> : null
            }
        </div>
    )

}

export default AddBlockProduct