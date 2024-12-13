// Alertas.jsx
import { notification } from 'antd';
import 'antd/dist/reset.css'; // Importação do CSS do Ant Design

const AlertPopup = ({ message, type }) => {
    if (type === 'success') {
        notification.success({
            message: 'Sucesso',
            description: message,
            showProgress: true,
            pauseOnHover: false
        });
    } else if (type === 'error') {
        notification.error({
            message: 'Erro',
            description: message,
            showProgress: true,
            pauseOnHover: false
        });
    }
    return null;
};

export default AlertPopup;
