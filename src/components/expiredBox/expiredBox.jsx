import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import token from "../../../Atom/accessToken";
import { BaseUrl } from "@/app/layout";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Cookies from "js-cookie";
import checkLog from "@/checkLoggin";

function ExpiredBox() {
    const [data, setData] = useState([])
    const accessToken = useRecoilValue(token)
    const [isLoading, setisLoading] = useState(true)


    async function getData() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get/expire-soon/`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                setisLoading(false)
                setData(response.data.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
            }
            );
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="exipredBox bg-bgPrimary w-[49%] py-5 rounded-3xl h-[calc(100vh-645px)]">
            <h3 className="px-5">دواء ينتهي صلاحيتة قريبا</h3>
            <div className="details h-[calc(100%-20px)] overflow-auto px-5">
                <ul className="w-[100%]">
                    {
                        isLoading ?
                            <div className="skeletonContainer">
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                            </div>
                            :
                            data.length < 1 ? <p className="text-center text-3xl my-24">لا يوجد منتجات</p> :
                                data?.map((product, index) => {
                                    return (
                                        <li key={index} className="flex items-center my-2 justify-between bg-[#ECC9C9] px-2 py-1 rounded-md">
                                            <span className="w-[30%]">{product.exp_date}</span>
                                            <span className="w-[30%] text-center" dir="ltr">{product.stock} units</span>
                                            <p className="w-[30%] text-left text-ellipsis overflow-hidden " dir="ltr">{product.name}</p></li>

                                    )
                                })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ExpiredBox