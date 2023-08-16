'use client'

import { useEffect, useRef, useState } from "react"
import InventoryTable from "../../components/inventoryTable/inventoryTable"
import Layout from "../../components/layout/layout"
import SalesTable from "../../components/salesTable/salesTable"
import AddProduct from "../../components/addProduct/addProduct"
import productOpen from "../../../Atom/productOpen"
import { useRecoilState, useRecoilValue } from "recoil"
import axios from "axios"
import ProductTable from "../../components/productTable/productTable"
import DetailsProductOpen from "../../../Atom/DetailsProductOpen"


export default function Inventory() {



    const [currentPage, setCureentPage] = useState(true)
    const [isProductOpen, setIsProductOpen] = useRecoilState(productOpen)
    const isOpen = useRecoilValue(DetailsProductOpen)
    const [productSearch, SetProductSearch] = useState()
    const searchInp = useRef()


    return (

        <Layout>

            <ul className="flex gap-5">
                <li onClick={() => { setCureentPage(true) }} className={` cursor-pointer text-[20px] font-semibold ${currentPage ? "text-vilot border-b-2" : ""} `}>المنتجات</li>
                <li onClick={() => { setCureentPage(false) }} className={` cursor-pointer text-[20px] font-semibold ${currentPage ? "" : "text-vilot border-b-2"} `}> مخزون صلاحية المنتجات</li>
            </ul>
            <div className="head flex">
                {
                    currentPage ?
                        <button onClick={() => setIsProductOpen(true)} className="bg-primary px-[50px] py-[8px] text-2xl text-[#fff] rounded-[10px] ms-auto"> أضف منتجًا </button>
                        : null
                }

            </div>
            <div className="tableDetails bg-bgPrimary p-5 mt-5 rounded-xl" >
                {
                    currentPage ? <ProductTable searchId={productSearch} /> : <InventoryTable searchId={productSearch} />
                }

            </div>
            {
                isProductOpen ? <AddProduct /> : null
            }


        </Layout>
    )
}
      