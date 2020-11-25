import {toast} from "react-toastify";

export const handelToast = (code = 0) => {
    switch (code) {
        case 100:
        case 200:
            success();
            break;
        case 300:
        case 302:
            founded();
            break;
        case 404:
            notFounded();
            break;
        default:
            error();
            break;
    }
};

function success() {
    toast.success("Thành công!");
}

function error() {
    toast.error("Thất bại!");
}

function warn() {
    toast.warn("Cần nhập đầy đủ thông tin !");
}

function founded() {
    toast.info("Sách hoặc mã sách đã tồn tại !");
}

function notFounded() {
    toast.info("Định dạng không đúng hoặc không tồn tại !");
}
