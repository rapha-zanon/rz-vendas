import React from 'react';
import { Card as AntCard } from 'antd';

const Card = ({ title, children, ...props }) => {
    
    return (
        
        <AntCard
            title={title}
            bordered={true}
            hoverable
            style={{ width: '100%' }}
            {...props} // Permite passar propriedades adicionais, como `style`, `onClick`, etc.
        >
            {children}
        </AntCard>
        
    );
    
};

export default Card;
