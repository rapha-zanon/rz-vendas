import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ResetSenha from './pages/ResetSenha/ResetSenha';
import Rodape from './components/Rodape/Rodape';
import Vendas from './pages/Vendas/Vendas';
import Cabecalho from './components/Cabecalho/Cabecalho'; // Importa o cabeçalho
import { Layout } from 'antd'; // Importa o Layout do Ant Design
import Menu from './components/Menu/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import VendasAberto from './pages/Vendas/VendasAberto';

const { Content } = Layout;

const App = () => {
    const location = useLocation();

    // Rotas sem menu e rodapé (ex.: Login e ResetSenha)
    const hideMenuRoutes = ['/'];
    const hideRodapeRoutes = ['/'];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Menu lateral (não aparece na página de login) */}
            {!hideMenuRoutes.includes(location.pathname) && <Menu />}

            <Layout>
                {/* Cabeçalho (aparece em todas as páginas, exceto Login e Reset Senha) */}
                {!hideMenuRoutes.includes(location.pathname) && <Cabecalho />}

                {/* Conteúdo principal */}
                <Content>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/reset-senha" element={<ResetSenha />} />
                        <Route path="/vendas/nova-venda" element={<Vendas />} />
                        <Route path="/vendas/vendas-aberto" element={<VendasAberto />} />
                    </Routes>
                </Content>

                {/* Rodapé (não aparece na página de login) */}
                {!hideRodapeRoutes.includes(location.pathname) && (
                    <Rodape />
                )}
            </Layout>
        </Layout>
    );
};

export default App;
