import Image from "next/image"
import warningIcon from '../../Img/warningIcon.png'
import { useRecoilState } from "recoil"
import confirmMed from "../../../Atom/confirmMed"
function Warning(props) {
    const [isOpenMed, setIsOpenMed] = useRecoilState(confirmMed)
    const confirm = false

    return (
        <div className="detailsSale bg-[#5f6076d2] z-50 left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative bg-bgPrimary rounded-2xl overflow-hidden w-[560px] ">
                <div className="icon bg-red p-[50px] shadow-xl">
                    <Image alt="icon" src={warningIcon} className="m-auto w-[150px]"></Image>
                </div>
                <div className="info text-secondary p-[30px] text-center">
                    <h4 className="text-[40px]">Warning!</h4>
                    <p className="text-[20px]">{props.title}</p>
                    <div className="buttons">
                        <button onClick={() => {
                            setIsOpenMed(false)
                            props.sendConfirm(confirm)

                        }} className="bg-primary text-[#fff] py-1 px-[70px] mx-4 mt-5 text-[20px] rounded-md">ألغاء</button>

                        <button onClick={() => {
                            setIsOpenMed(false)
                            props.sendConfirm(!confirm)

                        }} className="bg-red text-[#fff] py-1 px-[70px] mx-4 mt-5 text-[20px] rounded-md">تأكيد</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Warning