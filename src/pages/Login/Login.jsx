import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertPopup from '../../components/Alertas/Alertas'; // Componente de alerta
import './Login.css';
import loginIcon from '../../assets/login-icon.jpg'; // Importe a imagem corretamente

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulando autenticação
        if (email === 'admin@example.com' && password === '123456') {
            AlertPopup({ message: 'Login bem-sucedido! Redirecionando...', type: 'success' });

            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } else {
            AlertPopup({ message: 'Credenciais inválidas! Tente novamente.', type: 'error' });
        }
    };

    return (
        <div className="login-page vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100 shadow-lg" style={{ maxWidth: '900px', borderRadius: '8px', overflow: 'hidden' }}>
                {/* Imagem */}
                <div className="col-md-6 d-none d-md-block p-0">
                    <img
                        src={loginIcon}
                        alt="Login Illustration"
                        className="img-fluid h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Formulário */}
                <div className="col-md-6 bg-light p-4">
                    <h3 className="text-center mb-4">Faça seu login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Usuário
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-person"></i> {/* Ícone de usuário */}
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Senha
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-lock"></i> {/* Ícone de cadeado */}
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <input type="checkbox" id="remember" className="form-check-input" />
                                <label htmlFor="remember" className="form-check-label ms-1">
                                    Lembrar senha
                                </label>
                            </div>
                            <a href="/reset-senha" className="text-primary text-decoration-none">
                                Esqueci minha senha
                            </a>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
