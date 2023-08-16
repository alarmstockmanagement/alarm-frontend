'use client'
import Image from 'next/image'
import BackIcon from '../../Img/BackIcon.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BaseUrl } from '@/app/layout'
import DetailsProductOpen from '../../../Atom/DetailsProductOpen'
import AddProduct from '../addProduct/addProduct'
import editOpen from '../../../Atom/editOpen'
import UpdateProduct from '../updateProduct/updateProduct'
import search from '../../../Atom/search'

function DetailsProduct(props) {

    const [isSearch, setSearch] = useRecoilState(search)
    const [isOpen, setIsOpen] = useRecoilState(DetailsProductOpen)
    const [isEdit, setIsEdit] = useRecoilState(editOpen)

    return (

        <div className="createSale  z-50 bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary w-[1150px] ">
                <Image alt='icon' onClick={() => {
                    setSearch(false)
                    setIsOpen(false)
                }} src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className="showData my-5 flex gap-5 justify-between bg-[#EAEAEA] px-[50px] py-3">
                    <div className="details flex gap-5">
                        <div className="img w-[187px] h-[168px] rounded-md overflow-hidden">
                            <Image alt='test-Img' className='object-cover' src={`${BaseUrl}${props.currentProduct.medicine_img}`} width={"187"} height={"168"}></Image>

                        </div>
                        <ul className='flex flex-col justify-between text-[#000] text-xl'>
                            <li>{props.currentProduct.name}</li>
                            <li>كود المنتج : {props.currentProduct.bar_code}  </li>
                            <li>السعر : {props.currentProduct.price} $</li>
                            <li className='flex items-center '>

                                الكمية : {props.currentProduct.stock}
                            </li>
                            <li>تاريخ انتهاء الصلاحية : 15/12/2023</li>
                        </ul>
                    </div>

                </div>
                <button onClick={() => {
                    setIsEdit(true)
                }} className='bg-primary px-[50px] text-[#fff] w-full py-5 my-5 rounded-[10px]'> تعديل علي المنتج</button>

            </div>
            {
                isEdit ?
                    <UpdateProduct edit={props.currentProduct} isEdit={isEdit} />
                    : null
            }
        </div >
    )

}

export default DetailsProduct