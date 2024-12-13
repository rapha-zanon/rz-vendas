import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Para lidar com a navegação e rota atual
import { LineChartOutlined, FallOutlined, UserOutlined, HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu as AntMenu, Layout } from 'antd';
import logo from '../../assets/rz-vendas.webp';
import './Menu.css';

const { Sider } = Layout;

// Função para criar itens do menu
const getItem = (label, key, icon, children) => {
    return {
        key,
        icon,
        children,
        label,
    };
};

// Definindo os itens do menu, incluindo um submenu
const items = [
    getItem('Home', '/home', <HomeOutlined />, null), 
    getItem('Vendas', '/vendas', <LineChartOutlined />, 
      [
        getItem('Nova Venda', '/vendas/nova-venda', null, null),
        getItem('Vendas Em Aberto', '/vendas/vendas-aberto', null, null),
      ]
    ),
    getItem('Despesas', '/despesas', <FallOutlined />, [
        getItem('Nova Compra', '/despesas/nova-compra', null, null),
        getItem('Gastos Fixos', '/despesas/gastos-fixos', null, null),
    ]),
    getItem('Cadastros', '/cadastros', <UserOutlined />, [
      getItem('Parceiros', '/cadastros/parceiros', null, null),
      getItem('Características', '/cadastros/caracteristicas', null, null),
      getItem('Formas de Pagamento', '/cadastros/formas-pagamento', null, null),
    ]),
    getItem('Relatórios', '/relatorios', <PieChartOutlined />, [
        getItem('Relatório De Produtos', '/relatorios/produtos', null, null),
        getItem('Fluxo De Caixa', '/relatorios/fluxo-de-caixa', null, null),
    ])
];

const Menu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation(); // Obter a rota atual
    const navigate = useNavigate(); // Navegação programática

    // Função para alternar a visibilidade do menu
    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={handleToggle}
            breakpoint="lg"
            onBreakpoint={(broken) => {
                // Muda a visibilidade para collapsed se a tela for menor que 'lg'
                if (broken) {
                    setCollapsed(true);
                }
            }}
        >
            {/* Imagem do logo */}
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <AntMenu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={items}
                onClick={(item) => navigate(item.key)} 
            />
        </Sider>
    );
};

export default Menu;
