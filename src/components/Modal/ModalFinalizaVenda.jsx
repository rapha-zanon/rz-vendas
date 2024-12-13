import React, { useState } from "react";
import { BsCoin, BsFillPersonCheckFill, BsCashStack, BsCreditCardFill } from "react-icons/bs"
import { Modal, Button, Select, Input, Table } from "antd";
import AlertPopup from "../Alertas/Alertas"; // Importando o componente AlertPopup
import { DeleteOutlined, CalculatorTwoTone, UserOutlined, MoneyCollectOutlined, ShoppingCartOutlined } from "@ant-design/icons"; // Importa os ícones do Ant Design
const { Option } = Select;
import ModalConfirmacao from "./ModalConfirmacao"; // Certifique-se de que o caminho está correto

const ModalConfirmaVenda = ({
  open,
  onClose,
  produtos,
  total = 0,
  quantidade = 0,
  cliente,
  onOk,
}) => {
  const [formaPagamento, setFormaPagamento] = useState(null); // Estado para forma de pagamento
  const [valorPago, setValorPago] = useState(0); // Estado para valor pago
  const [pagamentos, setPagamentos] = useState([]); // Estado para lista de pagamentos
  const [isModalConfirmacaoOpen, setIsModalConfirmacaoOpen] = useState(false); // Estado para abrir o modal de confirmação

  // Calcular saldo restante
  const remainingBalance =
    total - pagamentos.reduce((acc, payment) => acc + payment.valor, 0);

  // Calcular troco
  const troco =
    pagamentos.reduce((acc, payment) => acc + payment.valor, 0) - total; // Troco total considerando todos os pagamentos

  // Listas de formas de pagamento
  const formasDePagamento = [
    { id: 1, nome: "Dinheiro" },
    { id: 2, nome: "Cartão de Crédito" },
    { id: 3, nome: "Cartão de Débito" },
    { id: 4, nome: "Transferência Bancária" },
    { id: 5, nome: "Pix" },
  ];

  const handleAddPayment = () => {
    if (valorPago > 0 && formaPagamento) {
      setPagamentos([
        ...pagamentos,
        { valor: valorPago, forma: formaPagamento },
      ]);
      setValorPago(0); // Reinicia o valor pago
    }
  };

  const handleClearPayments = () => {
    setPagamentos([]); // Limpa todos os pagamentos
  };

  // Colunas da tabela de pagamentos
  const columns = [
    {
      title: "Forma de Pagamento",
      dataIndex: "forma",
      key: "forma",
    },
    {
      title: "Valor Pago (R$)",
      dataIndex: "valor",
      key: "valor",
      render: (value) => value.toFixed(2), // Formata como moeda
    },
    {
      title: "Ação",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            setPagamentos(
              pagamentos.filter((pagamento) => pagamento !== record)
            );
          }}
        />
      ),
    },
  ];

  // Abre o modal de confirmação
  const handleOpenConfirmation = () => {
    if (remainingBalance <= 0) {
      setIsModalConfirmacaoOpen(true); // Abre o modal de confirmação
    } else {
      AlertPopup({
        message: "Por favor, complete o pagamento.",
        type: "error",
      }); // Notifica erro
    }
  };

  // Função para confirmar a venda
  const handleConfirmSale = () => {
    console.log("Venda confirmada", { formaPagamento, pagamentos });
    onOk(); // Chama a função para iniciar uma nova entrada
    AlertPopup({ message: "Venda confirmada com sucesso!", type: "success" }); // Notifica sucesso
    onClose(); // Fecha o modal principal
    setIsModalConfirmacaoOpen(false); // Fecha o modal de confirmação
  };

  return (
    <>
      <Modal
        title="Confirmação de Venda"
        open={open}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancelar
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleOpenConfirmation} // Abre o modal de confirmação
            disabled={remainingBalance > 0} // Desabilita botão se ainda houver saldo
          >
            Confirmar Venda
          </Button>,
        ]}
        width={600}
        style={{ top: "2%" }} // Define uma largura fixa para o modal
      >
        <div style={{ marginTop: 5, maxHeight: "460px", overflowY: "auto" }}>
          <p>
            <BsFillPersonCheckFill style={{ marginRight: 8 }} />
            <strong>Cliente:</strong> {cliente}
          </p>
          <p>
            <BsCashStack style={{ marginRight: 8 }} />
            <strong>Total em Reais:</strong> R$ {total.toFixed(2)}
          </p>
          <p>
            <ShoppingCartOutlined style={{ marginRight: 8 }} />
            <strong>Total de Quantidade:</strong> {quantidade || 0}
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ margin: 0, marginInlineEnd: 8 }}>
                <BsCreditCardFill style={{ marginRight: 8 }} />
              <strong>Forma de Pagamento:</strong>
            </p>
            <Select
              style={{ width: "40%" }}
              placeholder="Selecione uma forma de pagamento"
              onChange={setFormaPagamento} // Atualiza a forma de pagamento selecionada
            >
              {formasDePagamento.map((forma) => (
                <Option key={forma.id} value={forma.nome}>
                  {forma.nome}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ marginTop: 16 }}>
            {/* Deixar campos lado a lado*/}
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0 }}>
                <BsCoin style={{ marginRight: 8 }} />
                <strong>Valor Pago:</strong>
              </p>
              <Input
                type="number"
                value={valorPago}
                onChange={(e) => setValorPago(Number(e.target.value) || 0)} // Atualiza o valor pago
                placeholder="Insira o valor pago"
                style={{ width: "80px", marginLeft: 8 }} // Define largura menor para o input
              />
              <CalculatorTwoTone
                style={{ cursor: "pointer", marginLeft: 8, fontSize: "24px" }} // Aumenta o tamanho do ícone
                onClick={() => setValorPago(total)}
              />
            </div>

            <Button
              type="primary"
              style={{ marginTop: 16 }}
              onClick={handleAddPayment}
              disabled={valorPago <= 0 || !formaPagamento} // Desabilita se entrada inválida
            >
              Adicionar Pagamento
            </Button>
            <Button
              type="danger"
              style={{ marginTop: 16, marginLeft: 8 }}
              onClick={handleClearPayments}
              disabled={pagamentos.length === 0} // Desabilita se não houver pagamentos
            >
              Limpar Pagamentos
            </Button>
          </div>
          {remainingBalance > 0 && (
            <p style={{ marginTop: 16, color: "red" }}>
              <strong>Restante para Pagar:</strong> R$ {remainingBalance.toFixed(2)}
            </p>
          )}
          {troco > 0 && (
            <p style={{ marginTop: 16, color: "red" }}>
              <strong>Troco:</strong> R$ {troco.toFixed(2)}
            </p>
          )}
          <div style={{ marginTop: 16 }}>
            <Table
              dataSource={pagamentos}
              columns={columns}
              pagination={false}
              rowKey={(record) => `${record.forma}-${record.valor}`} // Chave única para cada linha
              size="small" // Torna a tabela menor
            />
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmação */}
      <ModalConfirmacao
        title="Confirmação de Venda"
        okText="Confirmar"
        cancelText="Cancelar"
        visible={isModalConfirmacaoOpen} // Verifique se 'open' ou 'visible' está sendo usado
        onCancel={() => setIsModalConfirmacaoOpen(false)} // Fecha o modal de confirmação
        onConfirm={handleConfirmSale} // Chama a função para confirmar a venda
        message="Você tem certeza que deseja confirmar a venda?"
      />
    </>
  );
};

export default ModalConfirmaVenda;
