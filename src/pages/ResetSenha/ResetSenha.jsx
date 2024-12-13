import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertPopup from '../../components/Alertas/Alertas'; // Componente de alerta

const ResetSenha = () => {
    const [email, setEmail] = useState('');
    const [mensagemAlerta, setMensagemAlerta] = useState(null);
    const [tipoAlerta, setTipoAlerta] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulando o envio de um e-mail para redefinição de senha
        if (email) {
            setMensagemAlerta('Instruções para redefinição de senha enviadas para seu e-mail! Redirecionando...');
            setTipoAlerta('success');

            // Redireciona para a página de login após 2 segundos
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else {
            setMensagemAlerta('Por favor, insira um e-mail válido.');
            setTipoAlerta('error');
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Esqueci Minha Senha</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Enviar
                    </button>
                </form>
            </div>

            {/* Exibe o alerta caso haja uma mensagem */}
            {mensagemAlerta && (
                <AlertPopup
                    message={mensagemAlerta}
                    type={tipoAlerta}
                    onClose={() => setMensagemAlerta(null)}
                />
            )}
        </div>
    );
};

export default ResetSenha;
