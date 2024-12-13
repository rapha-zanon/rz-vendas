import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Ícone do WhatsApp
import './Rodape.css'; // Estilo CSS para o rodapé

const Rodape = () => {
    return (
        <footer className="rodape">
            <div className="container text-center py-0">
                <p>© {new Date().getFullYear()} Desenvolvido por Raphael Zanon</p>
            </div>
        </footer>
    );
};

export default Rodape;
