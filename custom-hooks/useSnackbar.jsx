import {toast} from 'react-toastify'
export function useSnackbar(){
    function showSnackbar(message , type , position ='top-center' , autoCloseTimeout = 1500 , className){
        toast[type](message , {
            closeButton: true,
            position,
            className,
            autoClose: autoCloseTimeout,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }
    return showSnackbar
}