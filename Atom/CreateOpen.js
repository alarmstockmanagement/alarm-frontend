import { atom } from "recoil";

const createOpen = atom({
    key: 'createOpen',
    default: false,
});

export default createOpen