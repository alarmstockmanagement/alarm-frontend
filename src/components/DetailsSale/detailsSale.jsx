import Image from "next/image"
import BackIcon from '../../Img/BackIcon.png'
import { useEffect, useState } from "react"
import axios from "axios"
import { BaseUrl } from "@/app/layout"
import { useRecoilState, useRecoilValue } from "recoil"
import token from "../../..//Atom/accessToken"
import openDetails from "../../../Atom/openDetails"
import DetailsId from "../../../Atom/DetailsId"
import Cookies from "js-cookie"
import checkLog from "@/checkLoggin"

function DetailsSale() {

    const [data, setData] = useState()
    const [disease, setDisease] = useState()
    const tokken = useRecoilValue(token)
    const [isOpen, setisOpen] = useRecoilState(openDetails)
    const id = useRecoilValue(DetailsId)
    let date = new Date(data?.sold_at)


    async function getDetails() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/solds/get/${id}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                getDise(response.data.data.disease)
                setData(response.data.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    checkLog()

                }
            }
            );

    }

    async function getDise(id) {

        const optionsDeas = {
            method: 'GET',
            url: `${BaseUrl}/disease/get/${id}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let getDeas = await axios.request(optionsDeas)
            .then(function (response) {
                setDisease(response.data.data)
            })
            .catch(function (error) {
            }
            );
    }

    useEffect(() => {
        getDetails()
    },[])

    return (
        <div className="detailsSale z-10 bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative max-h-[80%] overflow-y-scroll rounded-[15px] py-[50px] bg-bgPrimary w-[1150px] ">
                <Image onClick={() => { setisOpen(false) }} alt="icon" src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className='form px-[50px]'>
                    <div className=" flex gap-5 mb-5">
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">المرض
                            </label>
                            <input disabled defaultValue={disease?.name} type="text" />
                        </div>
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">رقم المبيعة</label>
                            <input type="text" disabled defaultValue={data?.sold_number} />
                        </div>
                    </div>
                    <div className=" flex gap-5 mb-5">
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">تاريخ المبيعة
                            </label>
                            <input defaultValue={data?.sold_at.split("T")[0]} disabled type="text" />
                        </div>
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">وقت المبيعة </label>
                            <input type="text" disabled defaultValue={date.toString().split(" ")[4]} />
                        </div>
                    </div>
                    <div className=" flex gap-5 mb-5">
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">المستخدم
                            </label>
                            <input type="text" disabled defaultValue={data?.pharmacist} />
                        </div>
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">اجمالي السعر </label>
                            <input type="text" disabled defaultValue={data?.total} />
                        </div>
                    </div>
                </div>
                {
                    data?.sold_items.map((item) => {
                        return (
                            <>
                                <div className=" showData my-5 flex gap-5 justify-between odd:bg-[#EAEAEA] px-[50px] py-3">
                                    <div className="details flex gap-5">
                                        <div className="img w-[190px] h-[170px] rounded-md overflow-hidden">
                                            <Image alt="addImg" width={190} height={170} className="object-cover h-full w-full" src={`${BaseUrl}${item.medicine.medicine_img}`} ></Image>
                                        </div>
                                        <ul className='flex flex-col justify-between'>
                                            <li>{item.medicine.name}</li>
                                            <li>كود المنتج : {item.medicine.bar_code}  </li>
                                            <li>السعر : $ {item.medicine.price}</li>
                                            <li className='flex items-center '>الكمية
                                                <div className="counter relative w-[100px] ms-4">
                                                    <input type="number" className='text-center h-full w-full bg-secondary text-[#fff] p-[2px] rounded focus-visible:outline-none' value={item.quantity} />
                                                </div>
                                            </li>
                                            <li>تاريخ انتهاء الصلاحية : {item.medicine.exp_date}</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DetailsSale