import React from 'react';
import { Row, Col } from 'antd';
import Card from '../../components/Card/Card'; // Caminho para o componente genérico Card

const VendasAberto = () => {
    const products = [
        { id: 1, name: 'Cliente A', price: 10.0, quantity: 5 },
        { id: 2, name: 'Cliente B', price: 20.0, quantity: 4 },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Vendas em Aberto</h2>
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card title={product.name}>
                            
                            <p>
                                <strong>Total:</strong> R$ {product.price.toFixed(2)}
                            </p>
                            <p>
                                <strong>Quantidade Itens:</strong> {product.quantity}
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default VendasAberto;
