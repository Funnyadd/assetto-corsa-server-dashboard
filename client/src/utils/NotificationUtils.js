import { toast } from 'react-toastify';

export const sendErrorNotification = (message) => sendNotification(message, "error")
export const sendWarningNotification = (message) => sendNotification(message, "warning")
export const sendSuccessNotification = (message) => sendNotification(message, "success")

export const sendNotification = (message, type = "info") => {
    toast(
        renderNotification(message, type),
        { className: `alert alert-${type} flex` }
    )
}

export const renderNotification = (message, type) => {
    return (
        <div className='flex space-x-4'>
            {getIcon(type)}
            <span>{message}</span>
        </div>
    )
}

const baseIcon = (d) => {
    return ( 
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="stroke-current shrink-0 w-6" 
            fill="none" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={d} />
        </svg> 
    )
}

const getIcon = (type) => {
    switch (type) {
        case "success":
            return baseIcon("M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z")
        case "error":
            return baseIcon("M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")
        case "warning":
            return baseIcon("M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")
        default: // info icon
            return baseIcon("M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z")
    }
}
