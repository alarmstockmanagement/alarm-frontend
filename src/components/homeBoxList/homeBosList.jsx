import { Skeleton } from "@mui/material"
import { useState } from "react"

function HomeBoxList(props) {
    let data = props.data?.slice(0, 3)
    const isLoading = props.loading



    return (
        <div className="homeBox bg-bgPrimary rounded-[30px] h-[210px] w-[calc(33.33%-27px)] py-8 px-5">
            <div className="boxTop flex justify-between items-center">
                <h3 className="font-semibold">{props.name}</h3>
            </div>
            <div className="boxBody text-center" dir="ltr">
                <ul>
                    {
                        isLoading ?
                            <div className="skeletonContainer">
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                            </div>
                            :
                            data.length < 1 && props.type === "sales" ? <p className="text-xl my-10">لا يوجد مبيعات</p> :
                                data.length < 1 && props.type !== "sales" ? <p className="text-xl my-10">لا يوجد منتجات</p> :
                                    data?.map((product) => {
                                        return (
                                            props.type === "sales" ?
                                                <li key={product.id} className={`flex my-2 justify-between bg${props.secondry} text-[15px] px-2 py-1 rounded-md`}><h4>{product.sold_number}</h4><p>{product.total} $</p></li>
                                                :

                                                <li key={product.id} className={`flex my-2 justify-between bg${props.secondry} text-[15px] px-2 py-1 rounded-md`}><h4>{product.name}</h4><p>{product.stock} units</p></li>


                                        )
                                    })
                    }


                </ul>
            </div>
        </div>
    )
}

export default HomeBoxList