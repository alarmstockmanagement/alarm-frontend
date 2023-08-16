import { useRecoilState } from 'recoil'
import './salesTable.css'
import DetailsId from '../../../Atom/DetailsId'
import openDetails from '../../../Atom/openDetails'
import { Skeleton } from '@mui/material'

function SalesTable(props) {
    const [id, setId] = useRecoilState(DetailsId)
    const [DetailsOpen, setDestailsOpen] = useRecoilState(openDetails)
    let isLoading = props.loading


    return (
        <table className="salesTable border w-full bg-[#373854]">
            <thead className=''>
                <tr>

                    <th></th>
                    <th>المستخدم</th>
                    <th>تاريخ الطلبية</th>
                    <th>وقت المبيعة</th>
                    <th>سعر المبيعة</th>
                    <th>الكمية</th>
                    <th>رقم الطلب</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {
                    isLoading ?
                        <>
                            <tr key={1}>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>
                            <tr key={2}>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>
                            <tr key={3}>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>
                            <tr key={4}>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>

                        </>
                        :

                        props.data.map((sale, index) => {

                            return (
                                <>
                                    <tr key={index}>
                                        <td>
                                            <button onClick={() => {

                                                setId(sale.id)
                                                setDestailsOpen(true)
                                            }}>تفاصيل المبيعة</button>
                                        </td>
                                        <td>
                                            {sale.pharmacist}
                                        </td>
                                        <td>
                                            {sale.sold_at.split("T")[0]}
                                        </td>
                                        <td>
                                            {sale.sold_at.split("T")[1].split(".")[0]}
                                        </td>
                                        <td>
                                            {sale.total} $
                                        </td>
                                        <td>
                                            {sale.sold_items.length} units
                                        </td>
                                        <td>{sale.sold_number}</td>
                                    </tr>
                                </>
                            )
                        })
                }

            </tbody>
        </table>
    )
}

export default SalesTable