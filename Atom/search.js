import { atom } from "recoil";

const search = atom({
    key: 'search',
    default: false,
});

export default search