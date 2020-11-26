import { toast } from "react-toastify";

export const handelToast = (code = 0, time?: number, message?: string) => {
  switch (code) {
    case 100:
    case 200:
      success(time);
      break;
    case 300:
    case 302:
      founded();
      break;
    case 404:
      notFounded();
      break;
    case 500:
      notFounded();
      break;
    default:
      warn(message);
      break;
  }
};

function success(time?: number) {
  toast.success("Thành công! " + time + "s");
}

function error() {
  toast.error("Thất bại!");
}

function warn(message?: string) {
  toast.warn(message || "Cần nhập đầy đủ thông tin !");
}

function founded() {
  toast.info("Sách hoặc mã sách đã tồn tại !");
}

function notFounded() {
  toast.info("Định dạng không đúng hoặc không tồn tại !");
}
