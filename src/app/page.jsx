'use client'

import Layout from '../components/layout/layout'
import HomeBox from '../components/homeBox/homeBox'
import ExpiredBox from '../components/expiredBox/expiredBox'
import SalesBox from '../components/salesBox/salesBox'
import HomeBoxList from '../components/homeBoxList/homeBosList'
import { useRecoilState, useRecoilValue } from 'recoil'
import token from '../../Atom/accessToken'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from './layout'
import Cookies from 'js-cookie'
import checkLog from '@/checkLoggin'




export default function Home() {


  const [accessToken, setToken] = useRecoilState(token)
  const [dataMed, setDateMed] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [solds, setSolds] = useState([])

  async function getMedicine() {
    const options = {
      method: 'GET',
      url: `${BaseUrl}/medicine/get/all/`,
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },

    }
    let result = await axios.request(options)
      .then(function (response) {
        setisLoading(false)
        setDateMed(response.data.data)
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          checkLog()
        }
      }
      );
  }
  async function getSales() {
    const options = {
      method: 'GET',
      url: `${BaseUrl}/solds/get/all/`,
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },

    }
    let result = await axios.request(options)
      .then(function (response) {
        setisLoading(false)
        setSolds(response.data.data)
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          Cookies.set("islogged", false)
          window.location.reload()
        }
      }
      );
  }


  useEffect(() => {
    getMedicine()
    getSales()
  }, [])

  return (
    <Layout>
      <section className="home h-[calc(100vh-140px)]">

        <div className="boxWrapper flex flex-wrap gap-x-[40px] gap-y-[30px]">
          <HomeBox type="sales" primary="Vilot" secondry="VilotLow" title="إجمالي المبيعات" />
          <HomeBox type="orders" primary="Red" secondry="RedLow" title="اجمالي الطلابات" />
          <HomeBox primary="Green" secondry="GreenLow" type="sales" />
          <HomeBox primary="Vilot" secondry="VilotLow" type="danger-adds" title="عدد مرات بيع منتج محظور
بموجب لائحة طبية" />
          <HomeBoxList loading={isLoading} secondry="GreenLow" data={dataMed} name=" الدواء المضاف حديثا" />
          <HomeBoxList loading={isLoading} secondry="GreenLow" data={solds} name="المبيعات  المضافة حديثا" type="sales" />
        </div>
        <div className="infoWrapper flex justify-between mt-10">
          <SalesBox />
          <ExpiredBox />
        </div>
      </section>
    </Layout>
  )
}
