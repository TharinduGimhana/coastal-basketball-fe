import { notification } from 'antd';

const Toast = (toast_msg, type) => {
    notification.config({
        placement: 'topRight', // Change to topRight
        duration: 2,
    });

    let msg = toast_msg;
    let notificationType = type === 1 ? 'success' : 'error';

    if (notificationType === 'success') {
        notification.success({
            message: 'Success Notification',
            description: msg,
        });
    } else {
        notification.error({
            message: 'Error Notification',
            description: msg,
        });
    }
};

export default Toast;