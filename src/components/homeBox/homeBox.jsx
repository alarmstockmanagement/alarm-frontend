import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import token from "../../../Atom/accessToken"
import { BaseUrl } from "@/app/layout"
import { Skeleton } from "@mui/material"
import Cookies from "js-cookie"
import checkLog from "@/checkLoggin"

function HomeBox(props) {

    const [date, setDate] = useState(false)
    const [currentData, setCurrentData] = useState([])
    const accessToken = useRecoilValue(token)
    const [isLoading, setisLoading] = useState(true)


    async function getData() {
        let url
        if (props.title != undefined) {
            url = `${BaseUrl}/analytics/${date ? "monthly" : "weekly"}-${props.type}/`
        } else {
            url = `${BaseUrl}/analytics/daily-${props.type}/`
        }
        const options = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {

                setisLoading(false)
                setCurrentData(response.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }

            }
            );
    }
    function nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

    console.log(currentData, props.title)

    useEffect(() => {
        getData()
    }, [date])


    return (
        <div className="homeBox flex flex-col justify-between bg-bgPrimary rounded-[30px] h-[210px] w-[calc(33.33%-27px)] px-5 py-3">
            <div className="boxTop flex justify-between items-center">
                <h3 className="font-semibold">
                    {
                        props.title == undefined ? "اجمالي الايرادات" : props.title
                    }


                </h3>
                <i className={`fa-solid fa-cart-shopping bg${props.secondry} p-4 rounded-full text${props.primary}`}></i>
            </div>
            <div className="boxBody text-center" dir="ltr">
                <p className="text-[50px] font-semibold ">
                    {
                        isLoading ? <Skeleton className="rounded-md mx-auto" variant="rectangular" width={100} height={60} /> :
                            (props.type === "sales" ? ` ${nFormatter(currentData.profits, 1)} $` :
                                props.type === "danger-adds" ?
                                    currentData.count
                                :
                            currentData.sales_count
                    )

                        }

                </p>
                {
                    currentData.increase_percentage ?
                        <span className="text-green font-semibold text-[20px]">
                            +{currentData.increase_percentage}%</span> :
                        null
                }

            </div>
            <div className="boxFooter">
                <div onClick={() => {
                    setDate(!date)
                }} className={`toggleButton mt-[10px] flex px-3 text-[#fff] overflow-hidden relative mx-auto rounded-full justify-between bg${props.secondry} ${props.title == undefined ? "w-[55px]" : "w-[140px]"}  cursor-pointer`}>
                    {
                        props.title == undefined ?
                            <p className="relative z-10 ">يوميا</p>
                            : <>
                                <p className="relative z-10">اسبوعيا</p>
                                <p className="relative z-10 ">شهريا</p>
                            </>
                    }
                    <span className={`bg${props.primary}
                      rounded-full
                      ${props.title == undefined ? "w-full" : "w-[52%]"} 
                      
                      
                      h-full absolute
                      transition-[0.5s]
                     ${props.title == undefined ? "left-0" : date ? "left-[0%]" : "left-[47%]"} 
                      `}></span>
                </div>
            </div>
        </div>
    )
}

export default HomeBox