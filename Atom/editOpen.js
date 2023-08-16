import { atom } from "recoil";

const editOpen = atom({
    key: 'editOpen',
    default: false,
});

export default editOpen