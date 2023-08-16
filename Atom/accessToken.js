import Cookies from "js-cookie";
import { atom } from "recoil";


let value = ""
if (Cookies.get("accessToken")) {
    value = Cookies.get("accessToken")
}


const token = atom({
    key: 'token',
    default: value,
});

export default token