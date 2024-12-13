import React from 'react';
import { Modal } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';

const ConfirmModal = ({ visible, onConfirm, onCancel, title, okText, cancelText, message }) => {
    return (
        <Modal
            title={
                <span>
                    <InfoCircleTwoTone style={{ marginRight: 8 }} /> {/* Ícone de informação no título */}
                    {title}
                </span>
            }
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
        >
            <p>{message}</p> {/* Mensagem abaixo do título */}
        </Modal>
    );
};

export default ConfirmModal;
