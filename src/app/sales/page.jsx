'use client'

import { useEffect, useState } from "react"
import DetailsSale from "../../components/DetailsSale/detailsSale"
import CreateSale from "../../components/createSale/createSale"
import Layout from "../../components/layout/layout"
import SalesTable from "../../components/salesTable/salesTable"
import { useRecoilState, useRecoilValue } from "recoil"
import createOpen from "../../../Atom/CreateOpen"
import confirmOpen from "../../../Atom/ConfirmOpen"
import token from "../../../Atom/accessToken"
import { BaseUrl } from "../layout"
import openDetails from "../../../Atom/openDetails"
import axios from "axios"
import Cookies from "js-cookie"
import checkLog from "@/checkLoggin"

export default function Sales() {


    const [isCreateOpen, setIsCreateOpen] = useRecoilState(createOpen)
    const isConfirmOpen = useRecoilValue(confirmOpen)
    const [data, setData] = useState([])
    const tokken = useRecoilValue(token)
    const [isDetailsOpen, setIsDetailsOpen] = useRecoilState(openDetails)
    const [detailsId, setDestailsId] = useState()
    const [isLoading, setIsLoading] = useState(true)

    async function getProduct() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/solds/get/all/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                setIsLoading(false)
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
        getProduct()
    }, [isCreateOpen])

    return (
        <Layout>
            <div className="head flex">
                <button onClick={() => setIsCreateOpen(true)} className="bg-primary px-[50px] py-[8px] text-2xl text-[#fff] rounded-[10px] ms-auto">أنشاء مبيعة </button>
            </div>
            <div className="tableDetails bg-bgPrimary p-5 mt-5 rounded-[30px]" >
                <h3 className="text-xl mb-5">إجمالي المبيعات</h3>
                <div className="tableContainer h-[calc(100vh-310px)] overflow-auto rounded-xl">
                    {
                        data.length < 1 ? <p className="text-3xl"> لا يوجد مبيعات </p> :
                            <SalesTable loading={isLoading} data={data} />
                    }
                </div>
            </div>
            {
                isCreateOpen ? <CreateSale /> : null
            }

            {
                isDetailsOpen ? <DetailsSale /> : null
            }

        </Layout>
    )
}
