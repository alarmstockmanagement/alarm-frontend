'use client'

import { NextResponse } from 'next/server'


export default function middleware(req) {
    const today = new Date() // get today's date
    const dayExpire = new Date(today)
    dayExpire.setDate(today.getDate() + 1)
    let url = req.nextUrl
    let cookie = req.cookies.get('islogged')

    if (req.cookies.get("accessToken") == undefined) {
        req.cookies.set("islogged", false )
        req.cookies.set("accessToken", "")
    }

    if (url.pathname == ("/login") && cookie?.value == "true") {
        return NextResponse.redirect(new URL('/', req.url))
    }
    if (((cookie?.value == "false") || (cookie?.value == undefined) || (req.cookies.get("accessToken") == "") || (req.cookies.get("refreshToken") == "")) && url.pathname == ("/")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (((cookie?.value == "false") || (cookie?.value == undefined) || (req.cookies.get("accessToken") == "") || (req.cookies.get("refreshToken") == "")) && url.pathname == ("/sales")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (((cookie?.value == "false") || (cookie?.value == undefined) || (req.cookies.get("accessToken") == "") || (req.cookies.get("refreshToken") == "")) && url.pathname == ("/inventory")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (((cookie?.value == "false") || (cookie?.value == undefined) || (req.cookies.get("accessToken") == "") || (req.cookies.get("refreshToken") == "")) && url.pathname == ("/block")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (((cookie?.value == "false") || (cookie?.value == undefined) || (req.cookies.get("accessToken") == "") || (req.cookies.get("refreshToken") == "")) && url.pathname == ("/addUser")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}