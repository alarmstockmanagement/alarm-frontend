"use client"
import './globals.css'
import { Cairo, Urbanist } from 'next/font/google'
import { RecoilRoot, useRecoilValue } from 'recoil'
import middleware from '@/middleware'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import checkLog from '../checkLoggin'
import { useEffect } from 'react'


const inter = Cairo({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
})

const metadata = {
  title: 'CRUD mangment system',
  description: 'Generated by create next app',
}



export const BaseUrl = "https://stock-apis.up.railway.app"
export default function RootLayout({ children }) {

  useEffect(() => {
    checkLog()
  }, [children])

  return (
    <html lang="en">

      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <RecoilRoot>
        <body className={inter.className}>
          <ToastContainer style={{ width: "500px" }} theme="colored" rtl={true} draggable={true} draggablePercent={50} />
          {children}
          {middleware}
        </body>
      </RecoilRoot>
    </html>
  )
}
