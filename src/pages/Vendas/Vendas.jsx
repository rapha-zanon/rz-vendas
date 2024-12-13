
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import './Vendas.css'; // Importa o CSS personalizado
import { Table, Input, notification, Button, Alert } from 'antd'; // Componentes do Ant Design
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'; // Importa os ícones
import '../../styles/styles.css';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import ModalFinalizaVenda from '../../components/Modal/ModalFinalizaVenda'; // Importando o modal
import SelectClient from '../../components/Select/Select'; // Importando o SelectClient
import AlertPopup from '../../components/Alertas/Alertas';

const Vendas = () => {
    const [search, setSearch] = useState(''); // Estado para busca
    const [cart, setCart] = useState([]); // Estado para itens selecionados
    const [products, setProducts] = useState([
        { id: 1, name: 'Produto 1', description: 'Descrição do Produto 1', price: 10.0, quantity: 1 },
        { id: 2, name: 'Produto 2', description: 'Descrição do Produto 2', price: 20.0, quantity: 1 },
        { id: 3, name: 'Produto 3', description: 'Descrição do Produto 3', price: 30.0, quantity: 1 },
        { id: 4, name: 'Produto 4', description: 'Descrição do Produto 4', price: 40.0, quantity: 1 },
        { id: 5, name: 'Produto 5', description: 'Descrição do Produto 5', price: 50.0, quantity: 1 },
        { id: 6, name: 'Produto 6', description: 'Descrição do Produto 6', price: 60.0, quantity: 1 },
        { id: 7, name: 'Produto 7', description: 'Descrição do Produto 7', price: 70.0, quantity: 1 },
        { id: 8, name: 'Produto 8', description: 'Descrição do Produto 8', price: 80.0, quantity: 1 },
    ]); // Lista de produtos
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [pageSize, setPageSize] = useState(3); // Itens por página (padrão: 5)

    const [api, contextHolder] = notification.useNotification(); // Notificação

    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
    const [total, setTotal] = useState(0); // Estado para o total
    const [quantidade, setQuantidade] = useState(0); // Estado para a quantidade total
    const [troco, setTroco] = useState(0); // Estado para o troco, se aplicável

    // Estado e funções para o cliente
    const [clients] = useState([
        { id: 1, name: 'Cliente A' },
        { id: 2, name: 'Cliente B' },
        { id: 3, name: 'Cliente C' },
        { id: 4, name: 'Cliente D' },
        { id: 5, name: 'Cliente E' },
        { id: 6, name: 'Cliente F' },
        { id: 7, name: 'Cliente G' },
        { id: 8, name: 'Cliente H' },
        { id: 9, name: 'Cliente I' },
        { id: 10, name: 'Cliente J' },

        
    ]); // Lista de clientes
    const [selectedClient, setSelectedClient] = useState(null);


    // const onAssignClient = () => {
    //     if (selectedClient) {
    //         const client = clients.find((client) => client.id === selectedClient);
    //         AlertPopup({ message: `Cliente ${client.name} foi atribuído com sucesso!`, type: 'success' });
    //     } else {
    //         AlertPopup({ message: 'Selecione um cliente para atribuir.', type: 'error' });
    //     }
    // };

    // Função para resetar a página
    const resetPage = () => {
        setCart([]); // Limpar o carrinho
        setTotal(0); // Reset total
        setQuantidade(0); // Reset total quantity
        setSearch(''); // Reset search input
        setSelectedClient(null); // Reset cliente selecionado
    };

    // Atualiza a quantidade do produto
    const updateProductQuantity = (id, newQuantity) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: parseInt(newQuantity, 10) } : product
            )
        );
    };

    // Adiciona um item ao carrinho
    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                )
            );
        } else {
            setCart([...cart, product]);
        }
    
   AlertPopup({ message: `Produto ${product.name} adicionado ao carrinho.`, type: 'success' });
    };
    

    // Dados da tabela de produtos
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Configurações da tabela
    const columns = [
        {
            title: 'Produto',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `R$ ${price.toFixed(2)}`,
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '120px',
            render: (_, record) => (
                <Input
                    type="number"
                    value={record.quantity}
                    min="1"
                    onChange={(e) => updateProductQuantity(record.id, e.target.value)}
                />
            ),
        },
        {
            title: 'Ação',
            key: 'action',
            render: (_, record) => (
                <PlusOutlined
                    className="text-success"
                    style={{ cursor: 'pointer', fontSize: '24px' }}
                    onClick={() => addToCart(record)}
                />
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <h2>Nova Venda</h2>
            {contextHolder}
    
            {/* Busca e Seleção de Cliente */}
            <div className="row align-items-center mb-4">

                <div className="col-12 col-md-6">
                    <SelectClient
                        placeholder={'Atribuir cliente a venda'}
                        datas={clients}
                        selected={selectedClient}
                        setSelected={setSelectedClient}
                        //onAssignClient={onAssignClient}
                    />
                </div>
            </div>
    
            {/* Tabela de Produtos */}
            <h4>Produtos Disponíveis</h4>
            <div className="col-12 col-md-6 mb-3">
                    <Input
                        placeholder="Pesquise por produto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%' }} // O campo ocupa toda a largura disponível
                    />
                </div>
            <ConfigProvider locale={ptBR}>
                <div className="table-responsive">
                    <Table
                        dataSource={filteredProducts}
                        columns={columns}
                        pagination={{
                            current: currentPage,
                            pageSize,
                            total: filteredProducts.length,
                            showSizeChanger: true,
                            pageSizeOptions: ['3', '5', '10'],
                            onChange: (page) => setCurrentPage(page),
                            onShowSizeChange: (_, size) => setPageSize(size),
                        }}
                        rowKey="id"
                    />
                </div>
            </ConfigProvider>
    
            {/* Carrinho */}
            <h4>Itens Selecionados</h4>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>R$ {item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <DeleteOutlined
                                        className="text-danger"
                                        style={{ cursor: 'pointer', fontSize: '24px' }}
                                        onClick={() => setCart(cart.filter((cartItem) => cartItem.id !== item.id))}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {/* Botões */}
            <div className="row justify-content-end mt-3">
                <div className="col-12 col-md-auto mb-3 mb-md-0">
                    <Button
                        type="primary"
                        onClick={() => {
                            if (cart.length > 0) {
                                const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
                                const quantidade = cart.reduce((acc, item) => acc + item.quantity, 0);
                                setTotal(total);
                                setQuantidade(quantidade);
                                setTroco(0); // Ajuste conforme necessário
    
                                setIsModalVisible(true); // Abre o modal
                            } 
                        }}
                        disabled={cart.length === 0}
                        className="w-100"
                    >
                        Finalizar Venda
                    </Button>
                </div>
                <div className="col-12 col-md-auto">
                    <Button
                        type="primary"
                        onClick={() => {
                            if (cart.length > 0) {
                                AlertPopup({ message: 'Venda salva e mantida em aberto com sucesso!', type: 'success' });
                                setCart([]);
                            }
                        }}
                        disabled={cart.length === 0}
                        className="w-100"
                    >
                        Salvar e manter em aberto
                    </Button>
                </div>
            </div>
    
            {/* Modal de Confirmação */}
            <ModalFinalizaVenda
                open={isModalVisible}
                onClose={() => setIsModalVisible(false)} // Função para fechar o modal
                produtos={cart} // Passando os produtos do carrinho
                total={total} // Passando o total
                quantidade={quantidade} // Passando a quantidade total
                troco={troco} // Passando o troco, se aplicável
                onOk={resetPage} // Função para reiniciar a venda
                cliente={selectedClient}
            />
        </div>
    );
    
};

export default Vendas;
