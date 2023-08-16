import axios from "axios";
import { useEffect, useRef, useState } from "react";
import token from "../../../Atom/accessToken";
import { useRecoilState, useRecoilValue } from "recoil";
import { BaseUrl } from "@/app/layout";
import DetailsProductOpen from "../../../Atom/DetailsProductOpen";
import DetailsProduct from "../DetailsProduct/DetailsProduct";
import searchIcon from '../../Img/searchIcon.png'
import Image from "next/image";
import { Skeleton } from "@mui/material";
import Cookies from "js-cookie";
import editOpen from "../../../Atom/editOpen";
import checkLog from "@/checkLoggin";


function InventoryTable() {

    const [data, setDate] = useState([])
    const [selectedProduct, setSelectedProduct] = useState()
    const tokken = useRecoilValue(token)
    const [isOpen, setIsOpen] = useRecoilState(DetailsProductOpen)
    const searchInp = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const isEdit = useRecoilValue(editOpen)





    async function uploadImg() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get/all/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                setDate(response.data.data)
                setIsLoading(false)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }

            }
            );
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
                setDate([response.data.data])
                setIsLoading(false)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
            }
            );
    }

    useEffect(() => { uploadImg() }, [isEdit])

    return (
        <>
            <div className="head flex items-center  mb-5 justify-between ">
                <h3 className="text-3xl">إجمالي المنتجات </h3>
                <div className="filter content w-1/2">
                    <div className="form flex gap-8">
                        <div className="input py-5 flex flex-col relative w-full ">
                            <Image alt="icon" src={searchIcon} className="absolute right-5 top-[50%] translate-y-[-50%]"></Image>
                            <input ref={searchInp} onKeyUp={(e) => {
                                if (e.code == "Enter" || e.code == "NumpadEnter") {
                                    setIsLoading(true)
                                    getProduct(searchInp.current.value)
                                    if (searchInp.current.value == "") {
                                        uploadImg()
                                    }
                                }
                                if (searchInp.current.value == "") {
                                    uploadImg()
                                }
                            }}
                                type="number" name="search" placeholder="بحث"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="tableContainer h-[calc(100vh-410px)] overflow-auto rounded-xl">

                {
                    data.length < 1 ? <p className="text-3xl"> لا يوجد منتجات </p> :

                        <table className="salesTable border w-full bg-[#373854]">
                            <thead>
                                <tr>

                                    <th></th>
                                    <th>تاريخ انتهاء الصلاحية </th>
                                    <th>الكمية</th>
                                    <th>اسم المنتج</th>
                                    <th>كود المنتج</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {isLoading ?
                                    <>
                                        <tr>
                                            <td>
                                                <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                            </td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                            </td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                            </td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                            </td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                            <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                        </tr>

                                    </>
                                    :
                                    data?.map((product, index) => {
                                        return (

                                            <tr key={index}>
                                                <td>
                                                    <button onClick={() => {
                                                        setSelectedProduct(product)
                                                        setIsOpen(true)
                                                    }}>تفاصيل المنتج</button>
                                                </td>
                                                <td>
                                                    {product.exp_date}
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
                            {
                                isOpen ?
                                    <DetailsProduct currentProduct={selectedProduct} />
                                    :
                                    null
                            }
                        </table>
                }
            </div>
        </>
    )
}
export default InventoryTable