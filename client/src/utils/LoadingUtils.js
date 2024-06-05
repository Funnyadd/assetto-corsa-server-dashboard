import { toast } from "react-daisyui"

export const sendLoadingNotification = (message) => {
    return toast(
        <div className='flex space-x-4'>
            <span class="loading loading-spinner loading-sm"></span>
            <span>{message}</span>
        </div>,
        {
            className: `alert alert-info flex`
        }
    )
}

export const closeLoadingNotification = (toastId) => {
    toast.dismiss({ id:  toastId })
}