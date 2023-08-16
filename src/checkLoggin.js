import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import axios from "axios";
import { BaseUrl } from "./app/layout";

export default function checkLog() {

  const today = new Date() // get today's date
  const dayExpire = new Date(today)
  dayExpire.setDate(today.getDate() + 1)
  console.log(dayExpire.toDateString())
  let teest = dayExpire.toDateString()

  async function getNewToken() {
    let result = await axios.post(`${BaseUrl}/auth/refresh/`, {
      "refresh": Cookies.get("refreshToken")
    })
      .then(function (response) {
        Cookies.set("islogged", true, { expires: 900 })
        Cookies.set("accessToken", response.data.access, { expires: 900 })
        Cookies.set("refreshToken", response.data.refresh, { expires: 900 })
      })
      .catch(function (error) {
        Cookies.set("islogged", false, { expires: 900 })
        Cookies.set("accessToken", "", { expires: 900 })
        Cookies.set("refreshToken", "", { expires: 900 })
        window.location.reload()
      });

  }

  if (Cookies.get("accessToken") != undefined && Cookies.get("accessToken") != "") {
    const tokken = Cookies.get("accessToken")
    var decoded = jwt_decode(tokken);
    var currentDate = new Date()
    if (((decoded.exp * 1000) < currentDate.getTime())
      || (Cookies.get("accessToken") == undefined && Cookies.get("refreshToken") != undefined)) {
      getNewToken()
    }
  }
  if (Cookies.get("accessToken") == undefined ||
    Cookies.get("refreshToken") == undefined
  ) {
    Cookies.set("islogged", false, { expires: 900 })
    Cookies.set("accessToken", "", { expires: 900 })
    Cookies.set("refreshToken", "", { expires: 900 })
    window.location.reload()
  }
}
